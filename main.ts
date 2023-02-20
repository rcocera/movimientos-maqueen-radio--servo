function DERECHA () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 150)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 150)
    basic.showArrow(ArrowNames.East)
}
function ATRAS () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 150)
    basic.showArrow(ArrowNames.South)
}
input.onButtonPressed(Button.A, function () {
    for (let index = 0; index < 4; index++) {
        ADELANTE()
        basic.pause(200)
        IZQUIERDA()
        basic.pause(100)
    }
    PARAR()
})
function IZQUIERDA () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 150)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 0)
    basic.showArrow(ArrowNames.West)
}
function ADELANTE () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 150)
    basic.showArrow(ArrowNames.North)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "START") {
        ADELANTE()
    } else if (receivedString == "IZQ") {
        IZQUIERDA()
    } else if (receivedString == "DCHA") {
        DERECHA()
    } else if (receivedString == "STOP") {
        PARAR()
    } else if (receivedString == "MOTOR") {
        basic.showIcon(IconNames.Target)
        for (let index = 0; index <= 180; index++) {
            maqueen.servoRun(maqueen.Servos.S1, index)
            basic.pause(10)
        }
        for (let index = 0; index <= 180; index++) {
            maqueen.servoRun(maqueen.Servos.S1, 180 - index)
            basic.pause(10)
        }
    }
})
function PARAR () {
    maqueen.motorStop(maqueen.Motors.All)
}
radio.setGroup(33)
loops.everyInterval(1000, function () {
    basic.showLeds(`
        # . # . #
        . # . # .
        # . # . #
        . # . # .
        # . # . #
        `)
})
loops.everyInterval(1000, function () {
    radio.sendNumber(input.temperature())
})
