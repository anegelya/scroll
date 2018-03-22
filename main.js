var scenes = [],
    scrollY,
    visibleY = document.documentElement.clientHeight,
    visibleX = document.documentElement.clientWidth;


function createScenes(element) {
    var childs = element.querySelectorAll(".scene");

    var j = 0;

    for(var i=0; i < childs.length; i++) {
        var scene = {},
            elements = [];

        scene['content'] = childs[i];
        scene['coord'] = visibleY*j;
        j+=2;

        childs[i].style.transform = "translateY(" + scene['coord'] + "px)";

        childs[i].querySelectorAll(".animated").forEach(elem => {
            elements.push(elem);
        });

        scene['elements'] = elements;

        scenes.push(scene);
    }

    document.body.style.height = (visibleY * j) + "px";
}

function animateScenes() {
    scrollY = window.pageYOffset;

    for(var i = 0; i < scenes.length; i++) {
        if(scrollY <= scenes[i]["coord"]) {
            scenes[i]["content"].style.transform = "translateY(" + (scenes[i]["coord"] - scrollY) + "px)";
        } else if (scrollY >= (scenes[i]["coord"] + visibleY)) {
            scenes[i]["content"].style.transform = "translateY(" + (scenes[i]["coord"] - (scrollY - visibleY)) + "px)";
        } else {
            scenes[i]['elements'].forEach(elem => {
                elem.style.transform = "translateX(" + (visibleX*((scrollY - scenes[i]["coord"])/visibleY)) + "px)";
            });
        }
    }
}