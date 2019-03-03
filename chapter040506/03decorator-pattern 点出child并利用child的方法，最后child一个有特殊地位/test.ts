let _log = console.log
console.log = function(){
    let timestamp = `${new Date().toTimeString()}`

    let argumentsArray:string[] = [].slice.call(arguments)

    _log.apply(this,[timestamp,...argumentsArray])
}
console.log('你好')