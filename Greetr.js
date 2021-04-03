
;(function (global, $) {
    // "new" an object
    var Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }
    //hidden within the scope of the IIFE and never directly accessible 
    var supportedLangs = ["en", "es"];
    //informal greetings
    var greetings = {
        en: "hello",
        es: "hola"
    };
    // formal greetings
    var formalGreetings = {
        en: "greetings",
        es: "saludos"
    };
    // logger messages
    var logMessages = {
        en: "logged in",
        es: "inicio sesion"
    };
    // prototype holds methods (to save memory space)
    Greetr.prototype = {

        // "this" refers to the calling object at execution time
        fullName: function () {
            return this.firstName + " " + this.lastName;
        },
        validate: function () {
            // check that is a valid language
            // refrences the externally inaccessible "supportedLangs" within the closure
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        // retrieve messages from objet by referring to properties using [] syntax
        greeting: function () {
            return greetings[this.language] + " " + this.firstName + "!";
        },
        formalGreeting: function () {
            return formalGreetings[this.language] + ", " + this.fullName();
        },
        // chainable methods return their own containing object
        greet: function (formal) {
            var msg;
            // if undefined or null it will be coerced to "false"

            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting()
            }
            if (console) {
                console.log(msg);
            }
            // "this" refers to the calling object at execution time
            //makes the method chainable
            return this;
        },

        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ": " +
                    this.fullName());
            }
            //make chainable 
            return this;
        },
        setLang: function (lang) {
            // set the language
            this.language = lang;
            // valdate
            this.validate();
            // make chainable
            return this;
        },

        htmlGreeting: function (selector, formal) {
            if (!$) {
                throw "jquery not loaded";
            }
            if (!selector) {
                throw " missing jquery selector";
            }
            // determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            // make chainable
            return this;
        }

    };
    // The actual object is created here, allowing us to "new" an object without calling "new"
    Greetr.init = function (firstName, lastName, language) {

        var self = this;
        self.firstName = firstName || "";
        self.lastName = lastName || "";
        self.language = language || "en";

        self.validate();
    }
    // trick borrowed from jquery so we dont have to use the "new" keyword
    Greetr.init.prototype = Greetr.prototype;
    // attach our greetr to the global object, and provide a shorthand "$G" to ease our poor fingers
    global.Greetr = global.G$ = Greetr;

}(window, $));


