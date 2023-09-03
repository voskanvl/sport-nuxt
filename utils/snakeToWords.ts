export default function snakeToWords(x:string):string{
    return x.replace(/([A-Z])/g, " " + "$1").toLowerCase()
} 