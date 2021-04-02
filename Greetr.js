
(function (global, $) {

    var Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    var supportedLangs = ["en", "es"];

    var greetings = {
        en: "hello",
        es: "hola"
    };

    var formalGreetings = {
        en: "greetings",
        es: "saludos"
    };

    var logMessages = {
        en: "logged in",
        es: "inicio sesion"
    };

    Greetr.prototype = {
        fullName: function () {
            return this.firstName + " " + this.lastName;
        },
        validate: function () {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        greeting: function () {
            return greetings[this.language] + " " + this.firstName + "!";
        },
        formalGreetings: function () {
            return formalGreetings[this.language] + "," + this.fullName();
        },
        greet: function (formal) {
            var msg;

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
        }

    };

    Greetr.init = function (firstName, lastName, language) {

        var self = this;
        self.firstName = firstName || "";
        self.lastName = lastName || "";
        self.language = language || "en";

    }
    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr;

}(window, $));


