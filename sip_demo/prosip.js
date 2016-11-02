/*
 * Автор: Салыга Ярослав
 * специально для Prostoy.ru 
 * простой sipml5
 * версия 0.0.1
 */
(function ($) {
    var _self_ = null; // сам div
    var _debug_ = false; // дебаг
    var _type_ = 'call-audio'; // тип звонка (только аудио)
    var _number_to_call_ = null; // но для звонка
    var _hangup_incoming_ = false; // запрет на входящие
    // аудио блоки
    var _audio_ = {
        audio_remote: null,
        ringtone: null,
        ringbacktone: null,
        dtmfTone: null
    };
    // вилео блоки
    var _video_ = {
        video_remote: null,
        video_local: null
    };
    var _stack_ = null; // ссылка на SIPml.Stack
    var _register_ = null; // ссылка на SIPml.Session.Registration
    var _call_ = null; // ссылка на SIPml.Session.Call
    var _transfer_ = null; // трансфер
    // конфигурация звонка
    var _call_config_ = {
        audio_remote: null,
        video_size: {minWidth: 0, minHeight: 0, maxWidth: 0, maxHeight: 0},
        events_listener: {events: '*', listener: function (e) {
                prosip.eventSession(e);
            }},
        sip_caps: [
            {name: '+g.oma.sip-im'},
            {name: 'language', value: '\"ru\"'}
        ],
        bandwidth: {audio: 64, video: 512}
    };
    // конфигурация sip
    var _sip_config_ = {
        realm: null,
        impi: null,
        impu: null,
        password: null,
        display_name: null,
        websocket_proxy_url: null,
        outbound_proxy_url: null,
        enable_rtcweb_breaker: true,
        events_listener: {events: '*', listener: function (e) {
                prosip.eventStack(e);
            }},
        sip_headers: [
            {name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.2015.03.18 by prostoy.ru'},
            {name: 'Organization', value: 'Prostoy.ru'}
        ]
    };
    // список калбеков
    var _callbacks_ = {
        connected: function () {},
        permission_request: function () {},
        permission_accept: function () {},
        permission_refused: function () {},
        call_progress: function () {},
        terminate: function () {},
        terminate_call: function () {},
        incall: function () {},
        incoming: function () {},
        not_work: function () {},
        add_terminate: function () {}
    };
    // методы
    var prosip = {
        /**
         * инициализация
         * @param {type} options - опции
         * @returns {Boolean}
         */
        init: function (options) {
            if (prosip.browser()) {
                _self_ = $(this);
                _self_.data('sip.init', true);
                prosip.appendConfig(options);
                prosip.appendElements();
                prosip.initSipml();
                return true;
            } else {
                _callbacks_.not_work();
            }
        },
        browser: function () {
            var tlc = navigator.userAgent.toLowerCase();
            var browser = {
                mozilla: /mozilla/.test(tlc) && !/webkit/.test(tlc),
                webkit: /webkit/.test(tlc),
                opera: /opera/.test(tlc),
                msie: /msie/.test(tlc)
            };
            if (browser.webkit || browser.mozilla || browser.opera) {
                return true;
            }
            return false;
        },
        /**
         * конфигурация sip
         * @param {type} options - опции
         * @returns {Boolean}
         */
        appendConfig: function (options) {
            if (typeof options['login'] == 'undefined' || typeof options['password'] == 'undefined' || typeof options['server'] == 'undefined') {
                window.console.error('Ошибка ввода логина или пароля');
                return false;
            }
            // вводим данные из конфига
            _sip_config_.realm = options['server'];
            _sip_config_.impi = _sip_config_.display_name = options['login'];
            _sip_config_.password = options['password'];
            _sip_config_.impu = 'sip:' + _sip_config_.impi + '@' + _sip_config_.realm;
            _sip_config_.websocket_proxy_url = 'wss://' + _sip_config_.realm + ':8089/ws';
            _sip_config_.outbound_proxy_url = 'udp://' + _sip_config_.realm + ':5060';
            // калбеки
            if (typeof options.callbacks == 'object') {
                for (var id in _callbacks_) {
                    if (typeof options.callbacks[id] == 'function') {
                        _callbacks_[id] = options.callbacks[id];
                    }
                }
            }
            // добавим номер для набора
            _number_to_call_ = options['number'];
            if (typeof options['hangup_incoming'] != 'undefined') {
                _hangup_incoming_ = options['hangup_incoming'];
            }
            // проверка дебага
            if (typeof options['debug'] != 'undefined') {
                _debug_ = options['debug'];
            }
            if (_debug_) {
                window.console.log('Конфигурация: ', _sip_config_);
            }
            return true;
        },
        /**
         * добавляем элементы
         * необходимые для работы плагина
         * @returns {Boolean}
         */
        appendElements: function () {
            _audio_.audio_remote = $('<audio>').attr({'id': 'audio_remote', 'autoplay': 'autoplay'}).appendTo(_self_);
            _audio_.ringtone = $('<audio loop></audio>').attr({'id': 'ringtone', 'src': 'sounds/ringtone.wav'}).appendTo(_self_);
            _audio_.ringbacktone = $('<audio loop></audio>').attr({'id': 'ringbacktone', 'src': 'sounds/ringbacktone.wav'}).appendTo(_self_);
            _audio_.dtmfTone = $('<audio>').attr({'id': 'dtmfTone', 'src': 'sounds/dtmf.wav'}).appendTo(_self_);
            _video_.video_local = $('<video>').attr({'id': 'video_local', 'autoplay': 'autoplay', 'muted': 'true'}).appendTo(_self_)
                    .css({'width': '0', 'height': '0', 'opacity': '0', 'background-color': '#000000', '-webkit-transition-property': 'opacity', '-webkit-transition-duration': '2s'});
            _video_.video_remote = $('<video>').attr({'id': 'video_remote', 'autoplay': 'autoplay'}).appendTo(_self_)
                    .css({'width': '0', 'height': '0', 'opacity': '0', 'background-color': '#000000', '-webkit-transition-property': 'opacity', '-webkit-transition-duration': '2s'});
            // добавим в конфиг звонка элемент для динамика
            _call_config_.audio_remote = _audio_.audio_remote[0];
            return true;
        },
        /**
         * инициализация SIPml
         * @returns {function}
         */
        initSipml: function () {
            // запустим
            return SIPml.init(prosip.sipRegister);
        },
        /**
         * ивент при запуске
         * регистрация стака SIPml
         * @returns {Boolean}
         */
        sipRegister: function () {
            if (SIPml.isWebRtcSupported() && SIPml.isWebSocketSupported()) {
                // уровень дебага 
                SIPml.setDebugLevel((_debug_ == false) ? 'error' : 'info');
                _stack_ = new SIPml.Stack(_sip_config_);
                if (_stack_.start() != 0) {
                    if (_debug_) {
                        window.console.log('Ошибка старта стака:' + _stack_);
                    }
                    return false;
                }
            }
            return true;
        },
        /**
         * перезапуск
         * @returns {Boolean}
         */
        reconnect: function () {
            _stack_ = null;
            _register_ = null;
            _call_ = null;
            _transfer_ = null;
            return prosip.sipRegister();
        },
        /**
         * ивенты для сессии SIPml
         * @param {type} e - ивент SIPml
         * @returns {Boolean}
         */
        eventSession: function (e) {
            if (_debug_) {
                var d = new Date();
                var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                if (_debug_) {
                    window.console.groupCollapsed('Ивент сессии (' + time + '): ' + e.type);
                }
            }
            switch (e.type) {
                case 'connecting':
                    if (e.session == _register_) {
                        if (_debug_) {
                            window.console.log(e.description);
                        }
                    } else if (e.session == _call_) {
                        _callbacks_.call_progress();
                        if (_debug_) {
                            window.console.log(e.description);
                        }
                    }
                    break;
                case 'connected':
                    if (e.session == _register_) {
                        _callbacks_.connected();
                        if (_debug_) {
                            window.console.log(e.description);
                        }
                    } else if (e.session == _call_) {
                        _callbacks_.incall();
                        prosip.ringtone('stop', 'ringtone');
                        prosip.ringtone('stop', 'ringbacktone');
                        if (_debug_) {
                            window.console.log('Соединили с абонентом');
                        }
                        if (_debug_) {
                            window.console.log(e.description);
                        }
                    }
                    break;
                case 'terminating':
                case 'terminated':
                    if (e.session == _register_) {
                        _register_ = null;
                        _call_ = null;
                        if (_debug_) {
                            window.console.log(e.description);
                        }
                        _callbacks_.terminate();
                    } else if (e.session == _call_) {
                        prosip.terminate_call(e.description, e.getSipResponseCode());
                        _callbacks_.terminate_call();
                    }
                    break;
                case 'm_stream_video_local_added':
                case 'm_stream_video_local_removed':
                case 'm_stream_video_remote_added':
                case 'm_stream_video_remote_removed':
                case 'm_stream_audio_local_added':
                case 'm_stream_audio_local_removed':
                case 'm_stream_audio_remote_added':
                case 'm_stream_audio_remote_removed':
                    break;
                case 'i_ect_new_call':
                    _transfer_ = e.session;
                    break;
                case 'i_ao_request':
                    if (e.session == _call_) {
                        var responseCode = e.getSipResponseCode();
                        if (responseCode == 180 || responseCode == 183) {
                            prosip.ringtone('start', 'ringbacktone');
                        }
                    }
                    break;
                case 'm_early_media':
                    if (e.session == _call_) {
                        prosip.ringtone('stop', 'ringtone');
                        prosip.ringtone('stop', 'ringbacktone');
                    }
                    break;
                case 'm_local_hold_ok':
                    if (e.session == _call_) {
                        if (_call_.bTransfering) {
                            _call_.bTransfering = false;
                        }
                        _call_.bHeld = true;
                    }
                    break;
                case 'm_local_hold_nok':
                    if (e.session == _call_) {
                        _call_.bTransfering = false;
                    }
                    break;
                case 'm_local_resume_ok':
                    if (e.session == _call_) {
                        _call_.bTransfering = false;
                        _call_.bHeld = false;
                    }
                    break;
                case 'm_local_resume_nok':
                    if (e.session == _call_) {
                        _call_.bTransfering = false;
                    }
                    break;
                case 'm_remote_hold':
                    if (e.session == _call_) {
                    }
                    break;
                case 'm_remote_resume':
                    if (e.session == _call_) {
                    }
                    break;
                case 'm_bfcp_info':
                    if (e.session == _call_) {
                    }
                    break;
                case 'o_ect_trying':
                    if (e.session == _call_) {
                    }
                    break;
                case 'o_ect_accepted':
                    if (e.session == _call_) {
                    }
                    break;
                case 'o_ect_completed':
                case 'i_ect_completed':
                    if (e.session == _call_) {
                        if (_transfer_) {
                            _call_ = _transfer_;
                        }
                        _transfer_ = null;
                    }
                    break;
                case 'o_ect_failed':
                case 'i_ect_failed':
                    if (e.session == _call_) {
                    }
                    break;
                case 'o_ect_notify':
                case 'i_ect_notify':
                    if (e.session == _call_) {
                        if (e.getSipResponseCode() >= 300) {
                            if (_call_.bHeld) {
                                _call_.resume();
                            }
                        }
                    }
                    break;
                case 'i_ect_requested':
                    if (e.session == _call_) {
                        var s_message = "Do you accept call transfer to [" + e.getTransferDestinationFriendlyName() + "]?"; //FIXME
                        if (confirm(s_message)) {
                            _call_.acceptTransfer();
                            break;
                        }
                        _call_.rejectTransfer();
                    }
                    break;
            }
            if (_debug_) {
                window.console.groupEnd();
            }
            return true;
        },
        /**
         * ивенты для стака SIPml
         * @param {type} event - ивент SIPml
         * @returns {Boolean}
         */
        eventStack: function (event) {
            if (_debug_) {
                var d = new Date();
                var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                window.console.groupCollapsed('Ивент стака (' + time + '): ' + event.type);
            }
            switch (event.type) {
                case 'started':
                    try {
                        _register_ = _stack_.newSession('register', {
                            expires: 200,
                            events_listener: {events: '*', listener: function (e) {
                                    prosip.eventSession(e);
                                }},
                            sip_caps: [
                                {name: '+g.oma.sip-im', value: null},
                                {name: '+audio', value: null},
                                {name: 'language', value: '\"ru\"'}
                            ],
                            sip_headers: [
                                {name: 'What', value: 'Registration', session: false},
                                {name: 'Organization', value: 'Prostoy.ru', session: true}
                            ]
                        });
                        _register_.register();
                    } catch (e) {
                        window.console.error('Ошибка регистрации стака');
                    }
                    break;
                case 'stopping':
                case 'stopped':
                case 'failed_to_start':
                case 'failed_to_stop':
                    _stack_ = null;
                    _register_ = null;
                    _call_ = null;
                    prosip.ringtone('stop', 'ringtone');
                    prosip.ringtone('stop', 'ringbacktone');
                    break;
                case 'i_new_call':
                    if (_call_) {
                        // do not accept the incoming call if we're already 'in call'
                        event.newSession.hangup(); // comment this line for multi-line support
                    } else {
                        if (_hangup_incoming_ == true) {
                            if (_debug_) {
                                window.console.log('Автосброс');
                            }
                            event.newSession.hangup();
                            return true;
                        } else {
                            _call_ = event.newSession;
                            _call_.setConfiguration(_call_config_);
                            prosip.ringtone('start', 'ringtone');
                            _callbacks_.incoming();
                        }
                        break;
                    }
                case 'm_permission_requested':
                    _callbacks_.permission_request();
                    break;
                case 'm_permission_accepted':
                    _callbacks_.permission_accept();
                    break;
                case 'm_permission_refused':
                    prosip.terminate_call('Media stream permission denied');
                    _callbacks_.permission_refused();
                    break;
                case 'starting':
                default:
                    break;
            }
            if (_debug_) {
                window.console.groupEnd();
            }
            return true;
        },
        /**
         * рингтон
         * @param {type} event - start|stop ивент
         * @param {type} type - audio_remote|ringtone|ringbacktone|dtmfTone - тип 
         * @returns {Boolean}
         */
        ringtone: function (event, type) {
            switch (event) {
                case 'start':
                    _audio_[type][0].play();
                    break;
                case 'stop':
                    _audio_[type][0].pause();
                    break;
            }
            return true;
        },
        /**
         * ивент при обрыве|сбросе|недозвоне
         * @param {type} desc - описание
         * @returns {Boolean}
         */
        terminate_call: function (desc, val) {
            _call_ = null;
            prosip.ringtone('stop', 'ringtone');
            prosip.ringtone('stop', 'ringbacktone');
            if (_debug_) {
                window.console.log(desc);
            }
            _callbacks_.add_terminate(desc, val);
            return true;
        },
        /**
         * обработка для приема|набора звонка
         * @param {type} accept - true если нужно принять звонок
         * @returns {Boolean}
         */
        call: function (accept) {
            if (_stack_ && !_call_ && _number_to_call_ && !accept) {
                // create call session
                _call_ = _stack_.newSession(_type_, _call_config_);
                // make call
                if (_call_.call(_number_to_call_) != 0) {
                    _call_ = null;
                    return false;
                }
            } else if (_call_ && accept) {
                _call_.accept(_call_config_);
            }
            return true;
        },
        /**
         * обработка для приема|набора звонка
         * @param {type} number - номер
         * @returns {Boolean}
         */
        forse_call: function (number) {
            if (_stack_ && !_call_ && number) {
                // create call session
                _call_ = _stack_.newSession(_type_, _call_config_);
                // make call
                if (_call_.call(number) != 0) {
                    _call_ = null;
                    return false;
                }
            }
            return true;
        },
        /**
         * сброс звонка|дозвона
         * @returns {Boolean}
         */
        hangup: function () {
            if (_call_) {
                _call_.hangup({events_listener: {events: '*', listener: function (e) {
                            prosip.eventSession(e);
                        }
                    }
                });
            }
            return true;
        }
    };
    $.fn.prosip = function (method) {
        if (prosip[method]) {
            return prosip[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ((typeof method === 'object' || !method) && typeof $(this).data('sip.init') === 'undefined') {
            return prosip.init.apply(this, arguments);
        } else if (typeof $(this).data('sip.init') === 'undefined') {
            $.error('Метод с именем ' + method + ' не существует для $.chats');
        }
    };
}
)(jQuery);