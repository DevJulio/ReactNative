module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim()); // quebra a string onde tem  , e retira os espacos antes e dps das palavras
    
}