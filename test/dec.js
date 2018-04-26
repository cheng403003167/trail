class Boy {
    @speak
    run () {
        console.log('I can run')
    }
}

function speak(target,key,descriptor){
    console.log(descriptor);
}

const luke = new Boy()

luke.run();