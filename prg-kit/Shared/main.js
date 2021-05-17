// var radio_emulator = document.getElementById("radio_emulator");
// radio_emulator.addEventListener('load', function(){
//     var svgDoc = document.getElementById("radio_emulator").contentDocument;
//     var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
//     styleElement.textContent = `
//         .antenna { fill: pink }
//     `; // add whatever you need here
//     svgDoc.getElementById("configuration").appendChild(styleElement);
// });



function theme_radio(radio){ // Supply the svg object
    var svgDoc = radio.contentDocument;
    var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
    styleElement.textContent = radio.getAttribute('radio-style');
    svgDoc.getElementById("configuration").replaceChildren(styleElement);

    if (radio.getAttribute('radio-screen') == "true"){ // Only show the screen
        svgDoc.children[0].viewBox.baseVal.y= 570 
        svgDoc.children[0].viewBox.baseVal.x = 160
        svgDoc.children[0].viewBox.baseVal.height= 797 - 570 - 155
        svgDoc.children[0].viewBox.baseVal.width= 443 - 160 - 140
        var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
        styleElement.textContent = ".antenna { display: none }";
        svgDoc.getElementById("configuration").appendChild(styleElement);
    } else if (radio.getAttribute('radio-antenna') != "true"){ // Remove the antenna if not required
        svgDoc.children[0].viewBox.baseVal.y=390
        svgDoc.children[0].viewBox.baseVal.height= 400
        var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
        styleElement.textContent = ".antenna { display: none }";
        svgDoc.getElementById("configuration").appendChild(styleElement);
    }
    if (radio.getAttribute('radio-screen') != "true" && radio.getAttribute('radio-labels') == "false"){ // adjust for labels
        svgDoc.children[0].viewBox.baseVal.x = 80
        svgDoc.children[0].viewBox.baseVal.width= 320
        var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
        svgDoc.getElementById("configuration").appendChild(styleElement);
    }

    if (radio.getAttribute('radio-menu')){ 
        var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
        styleElement.textContent = `
            #top_line {
                display: none
            }
            #middle_line {
                display: none
            }
            #bottom_line {
                display: none
            }
            #middle_left {
                display: none
            }
            #bottom_left {
                display: none
            }
            #color_code {
                display: none
            }
            #dmrfm {
                display: none
            }
            #timeslot {
                display: none
            }
            #power {
                display: none
            }
            #color_code {
                display: none
            }
            #battery {
                display: none
            }
            #bar {
                display: none
            }
            #menu_bar, #menu_line, #menu_1, #menu_2, #menu_3, #menu_selected {
                display: block
            }
        `
        svgDoc.getElementById("configuration").appendChild(styleElement);
        menus_items = radio.getAttribute('radio-menu').split(",");
        svgDoc.getElementById("menu_text").textContent = menus_items[0];
        svgDoc.getElementById("menu_1_text").textContent = menus_items[1];
        svgDoc.getElementById("menu_2_text").textContent = menus_items[2];
        svgDoc.getElementById("menu_3_text").textContent = menus_items[3];
    }
    

    if (radio.getAttribute('radio-labels') == "false"){ // remove labels
        var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
        styleElement.textContent = ".label { display: none }";
        svgDoc.getElementById("configuration").appendChild(styleElement);
    }
    
    if (radio.getAttribute('radio-status')){ // status led
        var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
        styleElement.textContent = " #led_staus { fill: " + radio.getAttribute('radio-status') + " }";
        svgDoc.getElementById("configuration").appendChild(styleElement);
    }

    if (radio.getAttribute('radio-buttons')){ // buttons pressed
        for (var button of radio.getAttribute('radio-buttons').split(",")){
            var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
            styleElement.textContent = "#btn_" +button+ " path { stroke-width: 3; stroke: red  }\n#btn_" +button+ " { stroke-width: 3  !important; stroke: red !important }";
            svgDoc.getElementById("configuration").appendChild(styleElement);
        }
        
    }

    if (radio.getAttribute('radio-vfo')){ // vfo vs dmr
        var vfo = radio.getAttribute('radio-vfo');
        if (vfo == "false"){ // turn off rb / tb, center bottom text, change kerning back to normal
            var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
            svgDoc.getElementById("middle_line").transform.baseVal[0].matrix['e'] = 129.55 // shift to center
            svgDoc.getElementById("middle_line").transform.baseVal[0].matrix['f'] = 604 // move middle line up a little
            svgDoc.getElementById("bottom_line").transform.baseVal[0].matrix['e'] = 129.55 // shift to center
             
            styleElement.textContent = `
                #top_line {
                    font-weight: 900;
                }
                #middle_line {
                    letter-spacing: 0;
                    text-anchor: middle;
                    font-weight: 900;
                }
                #bottom_line {
                    letter-spacing: 0;
                    text-anchor: middle;
                }
                #middle_left {
                    display: none
                }
                #bottom_left {
                    display: none
                }
                #color_code {
                    display: none
                }
            `

            
            
            svgDoc.getElementById("configuration").appendChild(styleElement);
        } else {
            svgDoc.getElementById("RXVFO").textContent = vfo
            svgDoc.getElementById("TXVFO").textContent = vfo
            if (radio.getAttribute('radio-vfo-tx') == 'true' ){ 
                var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
                styleElement.textContent = `
                    #vfoT {
                        visibility: visible
                    }
                    #vfoR {
                        visibility: hidden
                    }
                `
                svgDoc.getElementById("configuration").appendChild(styleElement);
            } else {
                var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
                styleElement.textContent = `
                    #vfoT {
                        visibility: hidden
                    }
                    #vfoR {
                        visibility: visible
                    }
                `
                svgDoc.getElementById("configuration").appendChild(styleElement);
            }
        }
        
    }

    if (radio.getAttribute('radio-mode')){ // vfo vs dmr
        var mode = radio.getAttribute('radio-mode');
        if (mode == "fm"){
            svgDoc.getElementById("dmrfm").children[0].textContent = "FM"

            if  (radio.getAttribute('radio-ctcss')){
                svgDoc.getElementById("timeslot").children[0].textContent = radio.getAttribute('radio-ctcss')
            } else {
                svgDoc.getElementById("timeslot").children[0].textContent = ""
            }
        }
    }

    if (radio.getAttribute('radio-power')){ 
        if (radio.getAttribute('radio-power')){
            svgDoc.getElementById("power").children[0].textContent = radio.getAttribute('radio-power');
        }
    }
    if (radio.getAttribute('radio-ts')){ 
        if (radio.getAttribute('radio-ts')){
            svgDoc.getElementById("timeslot").children[0].textContent = "TS" + radio.getAttribute('radio-ts');
        }
    }
    if (radio.getAttribute('radio-cc')){ 
        if (radio.getAttribute('radio-cc')){
            svgDoc.getElementById("color_code").children[0].textContent = "C" + radio.getAttribute('radio-cc');
        }
    } else {
        svgDoc.getElementById("color_code").children[0].textContent = "" ;
    }

    if (radio.getAttribute('radio-battery')){ 
            svgDoc.getElementById("battery").children[0].textContent = radio.getAttribute('radio-battery');
    }
    if (radio.getAttribute('radio-top-line')){ 
            svgDoc.getElementById("top_line").children[0].textContent = radio.getAttribute('radio-top-line');
    }
    if (radio.getAttribute('radio-middle-line')){ 
            svgDoc.getElementById("middle_line").children[0].textContent = radio.getAttribute('radio-middle-line');
    }
    if (radio.getAttribute('radio-bottom-line')){ 
            svgDoc.getElementById("bottom_line").children[0].textContent = radio.getAttribute('radio-bottom-line');
    }

}