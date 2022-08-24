function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function getColor(name: string, axisColors: {[key: string]: string}){
    if(!(name in axisColors)){
      axisColors[name] = getRandomColor();
    }
    return axisColors[name];
}
