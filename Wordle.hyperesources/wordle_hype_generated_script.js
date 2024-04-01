//	HYPE.documents["Wordle"]

(function(){(function m(){function k(a,b,c,d){var e=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(m),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),e=l,false==!0&&(e=""),b.type="text/javascript",""!=d&&(b.integrity=d,b.setAttribute("crossorigin","anonymous")),b.src=e+"/"+c,a.appendChild(b)):window[b].push(m),e=!0);return e}var l="Wordle.hyperesources",f="Wordle",g="wordle_hype_container";if(false==
!1)try{for(var c=document.getElementsByTagName("script"),a=0;a<c.length;a++){var d=c[a].src,b=null!=d?d.indexOf("/wordle_hype_generated_script.js"):-1;if(-1!=b){l=d.substr(0,b);break}}}catch(p){}c=null==navigator.userAgentData&&navigator.userAgent.match(/MSIE (\d+\.\d+)/);c=parseFloat(c&&c[1])||null;d=!0==(null!=window.HYPE_758F||null!=window.HYPE_dtl_758F)||false==!0||null!=c&&10>c;a=!0==d?"HYPE-758.full.min.js":"HYPE-758.thin.min.js";c=!0==d?"F":"T";
d=d?"":"";if(false==!1&&(a=k("HYPE_758"+c,"HYPE_dtl_758"+c,a,d),false==!0&&(a=a||k("HYPE_w_758","HYPE_wdtl_758","HYPE-758.waypoints.min.js","")),false==!0&&(a=a||k("Matter","HYPE_pdtl_758","HYPE-758.physics.min.js","")),a))return;d=window.HYPE.documents;if(null!=d[f]){b=1;a=f;do f=""+a+"-"+b++;while(null!=d[f]);for(var e=
document.getElementsByTagName("div"),b=!1,a=0;a<e.length;a++)if(e[a].id==g&&null==e[a].getAttribute("HYP_dn")){var b=1,h=g;do g=""+h+"-"+b++;while(null!=document.getElementById(g));e[a].id=g;b=!0;break}if(!1==b)return}b=[];b=[{name:"playAgain",source:"function(hypeDocument, element, event) {\t\n\tlocation.reload(true);\n\t\n}",identifier:"51"},{name:"intializeMain",source:"function(hypeDocument, element, event) {\t\n\thypeDocument.getElementById('playAgain').style.visibility = 'hidden';\n\thypeDocument.getElementById('showWord').style.visibility = 'hidden';\n\t\n\tconst words = getWords();\n\tconst validWords = getValidWords();\n\t\n\tconst state = {\n\t\tsecret: words[Math.floor(Math.random() * words.length)],\n\t\tgrid: Array(6)\n\t\t\t.fill()\n\t\t\t.map(() => Array(5).fill('')),\n\t\tcurrentRow: 0,\n\t\tcurrentCol: 0,\n\t};\n\t\n\tfunction updateGrid() {\n\t\tfor (let i = 0; i < state.grid.length; i++) {\n\t\t\tfor (let j = 0; j < state.grid[i].length; j++) {\n\t\t\t\tconst box = hypeDocument.getElementById(`box${i}${j}`);\n\t\t\t\tbox.textContent = state.grid[i][j];\n\t\t\t}\n\t\t}\n\t}\n\t\n\tfunction processKeyInput(key) {\n\t    if (key === 'Enter') {\n\t        if (state.currentCol === 5) {\n\t            const word = getCurrentWord();\n\t            if (isWordValid(word)) {\n\t                revealWord(word);\n\t                state.currentRow++;\n\t                state.currentCol = 0;\n\t            } else {\n\t                invalidWordAnimation();\n\t                hypeDocument.startTimelineNamed('invalidWord');\n\t            }\n\t        } else {\n\t            invalidWordAnimation()\n\t            hypeDocument.startTimelineNamed('shortWordError');\n\t        }\n\t    } else if (key === 'Backspace' || key === 'Del') {\n\t        removeLetter();\n\t    } else if (isLetter(key)) {\n\t        addLetter(key);\n\t    }\n\t\n\t    updateGrid();\n\t}\n\t\n\tfunction registerKeyboardEvents() {\n\t    document.body.onkeydown = (e) => {\n\t        processKeyInput(e.key);\n\t    };\n\t}\n\t\n\tfunction initOnScreenKeyboard() {\n\t    const buttons = document.querySelectorAll('.keyboard-button');\n\t\n\t    buttons.forEach(button => {\n\t        button.addEventListener('click', (e) => {\n\t            // Normalize key value for consistency\n\t            let key = e.target.textContent;\n\t            if (key === 'Del') key = 'Backspace';\n\t            \n\t            processKeyInput(key);\n\t        });\n\t    });\n\t}\n\n\t\n\tfunction disableKeyPress() {\n\t\tdocument.body.onkeydown = (e) => {\n\t\t\te.preventDefault();\n\t\t}\n\t}\n\t\n\tfunction getCurrentWord() {\n\t\treturn state.grid[state.currentRow].reduce((prev, curr) => prev + curr);\n\t}\n\t\n\tfunction isWordValid(word) {\n\t\treturn validWords.includes(word);\n\t}\n\t\n\tfunction revealWord(guess) {\n\t\tconst row = state.currentRow;\n\t\tconst animation_duration = 750; // ms\n\t\n\t\tfor (let i = 0; i < 5; i++) {\n\t\t\tconst box = hypeDocument.getElementById(`box${row}${i}`);\n\t\t\tconst letter = box.textContent;\n\t\n\t\t\tsetTimeout(() => {\n\t\t\t\tif (letter === state.secret[i]) {\n\t\t\t\t\tshadeKeyBoard(letter, 'right');\n\t\t\t\t\tbox.classList.add('right');\n\t\t\t\t} else if (state.secret.includes(letter)) {\n\t\t\t\t\tshadeKeyBoard(letter, 'wrong');\n\t\t\t\t\tbox.classList.add('wrong');\n\t\t\t\t} else {\n\t\t\t\t\tshadeKeyBoard(letter, 'empty');\n\t\t\t\t\tbox.classList.add('empty');\n\t\t\t\t}\n\t\t\t}, ((i + 1) * animation_duration) / 2);\n\t\t}\n\t\t\n\t\t// animate valid word\n\t\tvalidWordAnimation();\n\t\n\t\tconst isWinner = state.secret === guess;\n\t\tconst isGameOver = state.currentRow === 5;\n\t\n\t\tsetTimeout(() => {\n\t\t\tif (isWinner) {\n\t\t\t\t//alert('Congratulations!');\n\t\t\t\thypeDocument.startTimelineNamed('winner');\n\t\t\t\tdisableKeyPress();\n\t\t\t\thypeDocument.getElementById('playAgain').style.visibility = 'visible';\n\t\t\t} else if (isGameOver) {\n\t\t\t\t//alert(`Better luck next time! The word was ${state.secret.toUpperCase()}.`);\n\t\t\t\thypeDocument.getElementById('showWord').textContent = state.secret.toUpperCase();\n\t\t\t\thypeDocument.getElementById('showWord').style.visibility = 'visible';\n\t\t\t\tdisableKeyPress();\n\t\t\t\thypeDocument.getElementById('playAgain').style.visibility = 'visible';\n\t\t\t}\n\t\t}, 3 * animation_duration);\n\t}\n\t\n\tfunction shadeKeyBoard(letter, letterType) {\n\t    for (const elem of document.getElementsByClassName(\"keyboard-button\")) {\n\t        if (elem.textContent === letter) {\n\t            // If updating to 'right', ensure 'wrong' and 'empty' are removed.\n\t            if (letterType === 'right') {\n\t                if (elem.classList.contains('wrong') || elem.classList.contains('empty')) {\n\t                    elem.classList.remove('wrong', 'empty');\n\t                }\n\t                elem.classList.add('right');\n\t            }\n\t            // If updating to 'wrong', ensure 'right' is removed (if needed), but don't downgrade from 'right' to 'wrong'.\n\t            else if (letterType === 'wrong' && !elem.classList.contains('right')) {\n\t                if (elem.classList.contains('empty')) {\n\t                    elem.classList.remove('empty');\n\t                }\n\t                elem.classList.add('wrong');\n\t            }\n\t            // If updating to 'empty', just add 'empty' without removing 'right' or 'wrong'. Adjust this as per your logic.\n\t            else if (letterType === 'empty') {\n\t                elem.classList.add('empty');\n\t            }\n\t        }\n\t    }\n\t}\n\t\n\tfunction isLetter(key) {\n\t\treturn key.length === 1 && key.match(/[a-z]/i);\n\t}\n\t\n\tfunction addLetter(letter) {\n\t\tif (state.currentCol === 5) return;\n\t\tstate.grid[state.currentRow][state.currentCol] = letter.toLowerCase();\n\t\tstate.currentCol++;\n\t}\n\t\n\tfunction removeLetter() {\n\t\tif (state.currentCol === 0) return;\n\t\tstate.grid[state.currentRow][state.currentCol - 1] = '';\n\t\tstate.currentCol--;\n\t}\n\t\n\tfunction validWordAnimation() {\n\t\tconst row = state.currentRow;\n\t\tif (row >= 0 && row <= 5) {\n\t\t    hypeDocument.startTimelineNamed('Row' + row);\n\t\t}\n\t}\n\t\n\tfunction invalidWordAnimation() {\n\t\tconst row = state.currentRow;\n\t\tif (row >= 0 && row <= 5) {\n\t\t    const timelineName = `Row${row} - invalid`;\n\t\t    hypeDocument.startTimelineNamed(timelineName);\n\t\t}\n\t}\n\t\n\t\n\t// Initialize both keyboard event listeners\n\tregisterKeyboardEvents();\n\tinitOnScreenKeyboard();\n\t\n\tconsole.log(state.secret);\t\n\t\n}",identifier:"296"}];e={};h={};for(a=0;a<b.length;a++)try{h[b[a].identifier]=b[a].name,e[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(n){window.console&&window.console.log(n),e[b[a].name]=function(){}}c=new window["HYPE_758"+c](f,g,{"1":{n:"dictionary.js"},"-2":{n:"blank.gif"},"-1":{n:"PIE.htc"},"2":{p:1,n:"win-image.gif",g:"102",t:"@1x"},"0":{n:"style.css"}},
l,[],e,[{n:"Main",o:"1",X:[0]}],[{A:{a:[{p:4,h:"296"}]},o:"3",p:"600px",cA:false,Y:320,Z:596,c:"#121213",L:[],bY:1,d:320,U:{},T:{"90":{q:false,z:0.14,i:"90",n:"Row5 - invalid",a:[{f:"c",y:0,z:0.02,i:"a",e:-5,s:0,o:"322"},{f:"c",y:0.02,z:0.02,i:"a",e:5,s:-5,o:"322"},{f:"c",y:0.04,z:0.02,i:"a",e:-5,s:5,o:"322"},{f:"c",y:0.06,z:0.02,i:"a",e:5,s:-5,o:"322"},{f:"c",y:0.08,z:0.02,i:"a",e:-5,s:5,o:"322"},{f:"c",y:0.1,z:0.02,i:"a",e:5,s:-5,o:"322"},{f:"c",y:0.12,z:0.02,i:"a",e:0,s:5,o:"322"},{y:0.14,i:"a",s:0,z:0,o:"322",f:"c"}],f:30,b:[]},"47":{q:false,z:2,i:"47",n:"Row3",a:[{f:"c",y:0,z:0.03,i:"cR",e:0.5,s:1,o:"347"},{f:"c",y:0.03,z:0.03,i:"cR",e:0,s:0.5,o:"347"},{f:"c",y:0.06,z:0.03,i:"cR",e:0.5,s:0,o:"347"},{f:"c",y:0.09,z:0.03,i:"cR",e:1,s:0.5,o:"347"},{f:"c",y:0.12,z:0.03,i:"cR",e:0.5,s:1,o:"343"},{y:0.12,i:"cR",s:1,z:0,o:"347",f:"c"},{f:"c",y:0.15,z:0.03,i:"cR",e:0,s:0.5,o:"343"},{f:"c",y:0.18,z:0.03,i:"cR",e:0.5,s:0,o:"343"},{f:"c",y:0.21,z:0.03,i:"cR",e:1,s:0.5,o:"343"},{f:"c",y:0.24,z:0.03,i:"cR",e:0.5,s:1,o:"344"},{y:0.24,i:"cR",s:1,z:0,o:"343",f:"c"},{f:"c",y:0.27,z:0.03,i:"cR",e:0,s:0.5,o:"344"},{f:"c",y:1,z:0.03,i:"cR",e:0.5,s:0,o:"344"},{f:"c",y:1.03,z:0.03,i:"cR",e:1,s:0.5,o:"344"},{f:"c",y:1.06,z:0.03,i:"cR",e:0.5,s:1,o:"345"},{y:1.06,i:"cR",s:1,z:0,o:"344",f:"c"},{f:"c",y:1.09,z:0.03,i:"cR",e:0,s:0.5,o:"345"},{f:"c",y:1.12,z:0.03,i:"cR",e:0.5,s:0,o:"345"},{f:"c",y:1.15,z:0.03,i:"cR",e:1,s:0.5,o:"345"},{f:"c",y:1.18,z:0.03,i:"cR",e:0.5,s:1,o:"346"},{y:1.18,i:"cR",s:1,z:0,o:"345",f:"c"},{f:"c",y:1.21,z:0.03,i:"cR",e:0,s:0.5,o:"346"},{f:"c",y:1.24,z:0.03,i:"cR",e:0.5,s:0,o:"346"},{f:"c",y:1.27,z:0.03,i:"cR",e:1,s:0.5,o:"346"},{y:2,i:"cR",s:1,z:0,o:"346",f:"c"}],f:30,b:[]},"53":{q:false,z:2,i:"53",n:"Row0",a:[{f:"c",y:0,z:0.03,i:"cR",e:0.5,s:1,o:"311"},{f:"c",y:0.03,z:0.03,i:"cR",e:0,s:0.5,o:"311"},{f:"c",y:0.06,z:0.03,i:"cR",e:0.5,s:0,o:"311"},{f:"c",y:0.09,z:0.03,i:"cR",e:1,s:0.5,o:"311"},{f:"c",y:0.12,z:0.03,i:"cR",e:0.5,s:1,o:"312"},{y:0.12,i:"cR",s:1,z:0,o:"311",f:"c"},{f:"c",y:0.15,z:0.03,i:"cR",e:0,s:0.5,o:"312"},{f:"c",y:0.18,z:0.03,i:"cR",e:0.5,s:0,o:"312"},{f:"c",y:0.21,z:0.03,i:"cR",e:1,s:0.5,o:"312"},{f:"c",y:0.24,z:0.03,i:"cR",e:0.5,s:1,o:"313"},{y:0.24,i:"cR",s:1,z:0,o:"312",f:"c"},{f:"c",y:0.27,z:0.03,i:"cR",e:0,s:0.5,o:"313"},{f:"c",y:1,z:0.03,i:"cR",e:0.5,s:0,o:"313"},{f:"c",y:1.03,z:0.03,i:"cR",e:1,s:0.5,o:"313"},{f:"c",y:1.06,z:0.03,i:"cR",e:0.5,s:1,o:"315"},{y:1.06,i:"cR",s:1,z:0,o:"313",f:"c"},{f:"c",y:1.09,z:0.03,i:"cR",e:0,s:0.5,o:"315"},{f:"c",y:1.12,z:0.03,i:"cR",e:0.5,s:0,o:"315"},{f:"c",y:1.15,z:0.03,i:"cR",e:1,s:0.5,o:"315"},{f:"c",y:1.18,z:0.03,i:"cR",e:0.5,s:1,o:"314"},{y:1.18,i:"cR",s:1,z:0,o:"315",f:"c"},{f:"c",y:1.21,z:0.03,i:"cR",e:0,s:0.5,o:"314"},{f:"c",y:1.24,z:0.03,i:"cR",e:0.5,s:0,o:"314"},{f:"c",y:1.27,z:0.03,i:"cR",e:1,s:0.5,o:"314"},{y:2,i:"cR",s:1,z:0,o:"314",f:"c"}],f:30,b:[]},"79":{q:false,z:0.14,i:"79",n:"Row0 - invalid",a:[{f:"c",y:0,z:0.02,i:"a",e:-5,s:0,o:"310"},{f:"c",y:0.02,z:0.02,i:"a",e:5,s:-5,o:"310"},{f:"c",y:0.04,z:0.02,i:"a",e:-5,s:5,o:"310"},{f:"c",y:0.06,z:0.02,i:"a",e:5,s:-5,o:"310"},{f:"c",y:0.08,z:0.02,i:"a",e:-5,s:5,o:"310"},{f:"c",y:0.1,z:0.02,i:"a",e:5,s:-5,o:"310"},{f:"c",y:0.12,z:0.02,i:"a",e:0,s:5,o:"310"},{y:0.14,i:"a",s:0,z:0,o:"310",f:"c"}],f:30,b:[]},"48":{q:false,z:2,i:"48",n:"Row4",a:[{f:"c",y:0,z:0.03,i:"cR",e:0.5,s:1,o:"317"},{f:"c",y:0.03,z:0.03,i:"cR",e:0,s:0.5,o:"317"},{f:"c",y:0.06,z:0.03,i:"cR",e:0.5,s:0,o:"317"},{f:"c",y:0.09,z:0.03,i:"cR",e:1,s:0.5,o:"317"},{f:"c",y:0.12,z:0.03,i:"cR",e:0.5,s:1,o:"318"},{y:0.12,i:"cR",s:1,z:0,o:"317",f:"c"},{f:"c",y:0.15,z:0.03,i:"cR",e:0,s:0.5,o:"318"},{f:"c",y:0.18,z:0.03,i:"cR",e:0.5,s:0,o:"318"},{f:"c",y:0.21,z:0.03,i:"cR",e:1,s:0.5,o:"318"},{f:"c",y:0.24,z:0.03,i:"cR",e:0.5,s:1,o:"319"},{y:0.24,i:"cR",s:1,z:0,o:"318",f:"c"},{f:"c",y:0.27,z:0.03,i:"cR",e:0,s:0.5,o:"319"},{f:"c",y:1,z:0.03,i:"cR",e:0.5,s:0,o:"319"},{f:"c",y:1.03,z:0.03,i:"cR",e:1,s:0.5,o:"319"},{f:"c",y:1.06,z:0.03,i:"cR",e:0.5,s:1,o:"320"},{y:1.06,i:"cR",s:1,z:0,o:"319",f:"c"},{f:"c",y:1.09,z:0.03,i:"cR",e:0,s:0.5,o:"320"},{f:"c",y:1.12,z:0.03,i:"cR",e:0.5,s:0,o:"320"},{f:"c",y:1.15,z:0.03,i:"cR",e:1,s:0.5,o:"320"},{f:"c",y:1.18,z:0.03,i:"cR",e:0.5,s:1,o:"321"},{y:1.18,i:"cR",s:1,z:0,o:"320",f:"c"},{f:"c",y:1.21,z:0.03,i:"cR",e:0,s:0.5,o:"321"},{f:"c",y:1.24,z:0.03,i:"cR",e:0.5,s:0,o:"321"},{f:"c",y:1.27,z:0.03,i:"cR",e:1,s:0.5,o:"321"},{y:2,i:"cR",s:1,z:0,o:"321",f:"c"}],f:30,b:[]},"86":{q:false,z:0.14,i:"86",n:"Row3 - invalid",a:[{f:"c",y:0,z:0.02,i:"a",e:-5,s:0,o:"342"},{f:"c",y:0.02,z:0.02,i:"a",e:5,s:-5,o:"342"},{f:"c",y:0.04,z:0.02,i:"a",e:-5,s:5,o:"342"},{f:"c",y:0.06,z:0.02,i:"a",e:5,s:-5,o:"342"},{f:"c",y:0.08,z:0.02,i:"a",e:-5,s:5,o:"342"},{f:"c",y:0.1,z:0.02,i:"a",e:5,s:-5,o:"342"},{f:"c",y:0.12,z:0.02,i:"a",e:0,s:5,o:"342"},{y:0.14,i:"a",s:0,z:0,o:"342",f:"c"}],f:30,b:[]},"104":{q:false,z:4,i:"104",n:"winner",a:[{f:"c",y:0,z:0.01,i:"cY",e:"0",s:"1",o:"307"},{y:0.01,i:"cY",s:"0",z:0,o:"307",f:"c"},{f:"c",y:2,z:2,i:"e",e:0,s:1,o:"307"},{y:4,i:"e",s:0,z:0,o:"307",f:"c"}],f:30,b:[]},"97":{q:false,z:1.05,i:"97",n:"invalidWord",a:[{f:"c",y:0,z:0.01,i:"cY",e:"0",s:"1",o:"308"},{y:0.01,i:"cY",s:"0",z:0,o:"308",f:"c"},{f:"c",y:0.25,z:0.1,i:"e",e:0,s:1,o:"308"},{y:1.05,i:"e",s:0,z:0,o:"308",f:"c"}],f:30,b:[]},"82":{q:false,z:0.14,i:"82",n:"Row1 - invalid",a:[{f:"c",y:0,z:0.02,i:"a",e:-5,s:0,o:"329"},{f:"c",y:0.02,z:0.02,i:"a",e:5,s:-5,o:"329"},{f:"c",y:0.04,z:0.02,i:"a",e:-5,s:5,o:"329"},{f:"c",y:0.06,z:0.02,i:"a",e:5,s:-5,o:"329"},{f:"c",y:0.08,z:0.02,i:"a",e:-5,s:5,o:"329"},{f:"c",y:0.1,z:0.02,i:"a",e:5,s:-5,o:"329"},{f:"c",y:0.12,z:0.02,i:"a",e:0,s:5,o:"329"},{y:0.14,i:"a",s:0,z:0,o:"329",f:"c"}],f:30,b:[]},"49":{q:false,z:2,i:"49",n:"Row5",a:[{f:"c",y:0,z:0.03,i:"cR",e:0.5,s:1,o:"323"},{f:"c",y:0.03,z:0.03,i:"cR",e:0,s:0.5,o:"323"},{f:"c",y:0.06,z:0.03,i:"cR",e:0.5,s:0,o:"323"},{f:"c",y:0.09,z:0.03,i:"cR",e:1,s:0.5,o:"323"},{f:"c",y:0.12,z:0.03,i:"cR",e:0.5,s:1,o:"324"},{y:0.12,i:"cR",s:1,z:0,o:"323",f:"c"},{f:"c",y:0.15,z:0.03,i:"cR",e:0,s:0.5,o:"324"},{f:"c",y:0.18,z:0.03,i:"cR",e:0.5,s:0,o:"324"},{f:"c",y:0.21,z:0.03,i:"cR",e:1,s:0.5,o:"324"},{f:"c",y:0.24,z:0.03,i:"cR",e:0.5,s:1,o:"325"},{y:0.24,i:"cR",s:1,z:0,o:"324",f:"c"},{f:"c",y:0.27,z:0.03,i:"cR",e:0,s:0.5,o:"325"},{f:"c",y:1,z:0.03,i:"cR",e:0.5,s:0,o:"325"},{f:"c",y:1.03,z:0.03,i:"cR",e:1,s:0.5,o:"325"},{f:"c",y:1.06,z:0.03,i:"cR",e:0.5,s:1,o:"326"},{y:1.06,i:"cR",s:1,z:0,o:"325",f:"c"},{f:"c",y:1.09,z:0.03,i:"cR",e:0,s:0.5,o:"326"},{f:"c",y:1.12,z:0.03,i:"cR",e:0.5,s:0,o:"326"},{f:"c",y:1.15,z:0.03,i:"cR",e:1,s:0.5,o:"326"},{f:"c",y:1.18,z:0.03,i:"cR",e:0.5,s:1,o:"327"},{y:1.18,i:"cR",s:1,z:0,o:"326",f:"c"},{f:"c",y:1.21,z:0.03,i:"cR",e:0,s:0.5,o:"327"},{f:"c",y:1.24,z:0.03,i:"cR",e:0.5,s:0,o:"327"},{f:"c",y:1.27,z:0.03,i:"cR",e:1,s:0.5,o:"327"},{y:2,i:"cR",s:1,z:0,o:"327",f:"c"}],f:30,b:[]},"113":{q:false,z:1.05,i:"113",n:"shortWordError",a:[{f:"c",y:0,z:0.01,i:"cY",e:"0",s:"1",o:"328"},{y:0.01,i:"cY",s:"0",z:0,o:"328",f:"c"},{f:"c",y:0.25,z:0.1,i:"e",e:0,s:1,o:"328"},{y:1.05,i:"e",s:0,z:0,o:"328",f:"c"}],f:30,b:[]},"50_hover":{q:false,z:1,i:"50_hover",n:"50_hover",a:[{f:"c",y:0,z:1,i:"g",e:"#3A3A3C",s:"#121213",o:"309"},{y:1,i:"g",s:"#3A3A3C",z:0,o:"309",f:"c"}],f:30,b:[]},"45":{q:false,z:2,i:"45",n:"Row1",a:[{f:"c",y:0,z:0.03,i:"cR",e:0.5,s:1,o:"333"},{f:"c",y:0.03,z:0.03,i:"cR",e:0,s:0.5,o:"333"},{f:"c",y:0.06,z:0.03,i:"cR",e:0.5,s:0,o:"333"},{f:"c",y:0.09,z:0.03,i:"cR",e:1,s:0.5,o:"333"},{f:"c",y:0.12,z:0.03,i:"cR",e:0.5,s:1,o:"334"},{y:0.12,i:"cR",s:1,z:0,o:"333",f:"c"},{f:"c",y:0.15,z:0.03,i:"cR",e:0,s:0.5,o:"334"},{f:"c",y:0.18,z:0.03,i:"cR",e:0.5,s:0,o:"334"},{f:"c",y:0.21,z:0.03,i:"cR",e:1,s:0.5,o:"334"},{f:"c",y:0.24,z:0.03,i:"cR",e:0.5,s:1,o:"330"},{y:0.24,i:"cR",s:1,z:0,o:"334",f:"c"},{f:"c",y:0.27,z:0.03,i:"cR",e:0,s:0.5,o:"330"},{f:"c",y:1,z:0.03,i:"cR",e:0.5,s:0,o:"330"},{f:"c",y:1.03,z:0.03,i:"cR",e:1,s:0.5,o:"330"},{f:"c",y:1.06,z:0.03,i:"cR",e:0.5,s:1,o:"331"},{y:1.06,i:"cR",s:1,z:0,o:"330",f:"c"},{f:"c",y:1.09,z:0.03,i:"cR",e:0,s:0.5,o:"331"},{f:"c",y:1.12,z:0.03,i:"cR",e:0.5,s:0,o:"331"},{f:"c",y:1.15,z:0.03,i:"cR",e:1,s:0.5,o:"331"},{f:"c",y:1.18,z:0.03,i:"cR",e:0.5,s:1,o:"332"},{y:1.18,i:"cR",s:1,z:0,o:"331",f:"c"},{f:"c",y:1.21,z:0.03,i:"cR",e:0,s:0.5,o:"332"},{f:"c",y:1.24,z:0.03,i:"cR",e:0.5,s:0,o:"332"},{f:"c",y:1.27,z:0.03,i:"cR",e:1,s:0.5,o:"332"},{y:2,i:"cR",s:1,z:0,o:"332",f:"c"}],f:30,b:[]},kTimelineDefaultIdentifier:{q:false,z:2.15,i:"kTimelineDefaultIdentifier",n:"Main Timeline",a:[{f:"b",y:0.15,z:0.03,i:"cR",e:0.5,s:1,o:"311"},{f:"b",y:0.18,z:0.03,i:"cR",e:0,s:0.5,o:"311"},{f:"b",y:0.21,z:0.03,i:"cR",e:0.5,s:0,o:"311"},{f:"b",y:0.24,z:0.03,i:"cR",e:1,s:0.5,o:"311"},{f:"b",y:0.27,z:0.03,i:"cR",e:0.5,s:1,o:"312"},{y:0.27,i:"cR",s:1,z:0,o:"311",f:"c"},{f:"b",y:1,z:0.03,i:"cR",e:0,s:0.5,o:"312"},{f:"b",y:1.03,z:0.03,i:"cR",e:0.5,s:0,o:"312"},{f:"b",y:1.06,z:0.03,i:"cR",e:1,s:0.5,o:"312"},{f:"b",y:1.09,z:0.03,i:"cR",e:0.5,s:1,o:"313"},{y:1.09,i:"cR",s:1,z:0,o:"312",f:"c"},{f:"b",y:1.12,z:0.03,i:"cR",e:0,s:0.5,o:"313"},{f:"b",y:1.15,z:0.03,i:"cR",e:0.5,s:0,o:"313"},{f:"b",y:1.18,z:0.03,i:"cR",e:1,s:0.5,o:"313"},{f:"b",y:1.21,z:0.03,i:"cR",e:0.5,s:1,o:"315"},{y:1.21,i:"cR",s:1,z:0,o:"313",f:"c"},{f:"b",y:1.24,z:0.03,i:"cR",e:0,s:0.5,o:"315"},{f:"b",y:1.27,z:0.03,i:"cR",e:0.5,s:0,o:"315"},{f:"b",y:2,z:0.03,i:"cR",e:1,s:0.5,o:"315"},{f:"b",y:2.03,z:0.03,i:"cR",e:0.5,s:1,o:"314"},{y:2.03,i:"cR",s:1,z:0,o:"315",f:"c"},{f:"b",y:2.06,z:0.03,i:"cR",e:0,s:0.5,o:"314"},{f:"b",y:2.09,z:0.03,i:"cR",e:0.5,s:0,o:"314"},{f:"b",y:2.12,z:0.03,i:"cR",e:1,s:0.5,o:"314"},{y:2.15,i:"cR",s:1,z:0,o:"314",f:"c"}],f:30,b:[]},"88":{q:false,z:0.14,i:"88",n:"Row4 - invalid",a:[{f:"c",y:0,z:0.02,i:"a",e:-5,s:0,o:"316"},{f:"c",y:0.02,z:0.02,i:"a",e:5,s:-5,o:"316"},{f:"c",y:0.04,z:0.02,i:"a",e:-5,s:5,o:"316"},{f:"c",y:0.06,z:0.02,i:"a",e:5,s:-5,o:"316"},{f:"c",y:0.08,z:0.02,i:"a",e:-5,s:5,o:"316"},{f:"c",y:0.1,z:0.02,i:"a",e:5,s:-5,o:"316"},{f:"c",y:0.12,z:0.02,i:"a",e:0,s:5,o:"316"},{y:0.14,i:"a",s:0,z:0,o:"316",f:"c"}],f:30,b:[]},"46":{q:false,z:2,i:"46",n:"Row2",a:[{f:"c",y:0,z:0.03,i:"cR",e:0.5,s:1,o:"336"},{f:"c",y:0.03,z:0.03,i:"cR",e:0,s:0.5,o:"336"},{f:"c",y:0.06,z:0.03,i:"cR",e:0.5,s:0,o:"336"},{f:"c",y:0.09,z:0.03,i:"cR",e:1,s:0.5,o:"336"},{f:"c",y:0.12,z:0.03,i:"cR",e:0.5,s:1,o:"337"},{y:0.12,i:"cR",s:1,z:0,o:"336",f:"c"},{f:"c",y:0.15,z:0.03,i:"cR",e:0,s:0.5,o:"337"},{f:"c",y:0.18,z:0.03,i:"cR",e:0.5,s:0,o:"337"},{f:"c",y:0.21,z:0.03,i:"cR",e:1,s:0.5,o:"337"},{f:"c",y:0.24,z:0.03,i:"cR",e:0.5,s:1,o:"338"},{y:0.24,i:"cR",s:1,z:0,o:"337",f:"c"},{f:"c",y:0.27,z:0.03,i:"cR",e:0,s:0.5,o:"338"},{f:"c",y:1,z:0.03,i:"cR",e:0.5,s:0,o:"338"},{f:"c",y:1.03,z:0.03,i:"cR",e:1,s:0.5,o:"338"},{f:"c",y:1.06,z:0.03,i:"cR",e:0.5,s:1,o:"339"},{y:1.06,i:"cR",s:1,z:0,o:"338",f:"c"},{f:"c",y:1.09,z:0.03,i:"cR",e:0,s:0.5,o:"339"},{f:"c",y:1.12,z:0.03,i:"cR",e:0.5,s:0,o:"339"},{f:"c",y:1.15,z:0.03,i:"cR",e:1,s:0.5,o:"339"},{f:"c",y:1.18,z:0.03,i:"cR",e:0.5,s:1,o:"340"},{y:1.18,i:"cR",s:1,z:0,o:"339",f:"c"},{f:"c",y:1.21,z:0.03,i:"cR",e:0,s:0.5,o:"340"},{f:"c",y:1.24,z:0.03,i:"cR",e:0.5,s:0,o:"340"},{f:"c",y:1.27,z:0.03,i:"cR",e:1,s:0.5,o:"340"},{y:2,i:"cR",s:1,z:0,o:"340",f:"c"}],f:30,b:[]},"84":{q:false,z:0.14,i:"84",n:"Row2 - invalid",a:[{f:"c",y:0,z:0.02,i:"a",e:-5,s:0,o:"335"},{f:"c",y:0.02,z:0.02,i:"a",e:5,s:-5,o:"335"},{f:"c",y:0.04,z:0.02,i:"a",e:-5,s:5,o:"335"},{f:"c",y:0.06,z:0.02,i:"a",e:5,s:-5,o:"335"},{f:"c",y:0.08,z:0.02,i:"a",e:-5,s:5,o:"335"},{f:"c",y:0.1,z:0.02,i:"a",e:5,s:-5,o:"335"},{f:"c",y:0.12,z:0.02,i:"a",e:0,s:5,o:"335"},{y:0.14,i:"a",s:0,z:0,o:"335",f:"c"}],f:30,b:[]}},bZ:180,O:["349","328","308","311","310","312","313","315","314","307","333","329","334","330","331","332","336","335","337","338","339","340","347","342","343","344","345","346","309","317","316","318","319","320","321","341","323","322","324","325","326","327","348"],n:"Main","_":0,v:{"349":{aU:8,G:"#FFF",c:394,H:"none",aV:8,r:"inline",d:44,s:"'American Typewriter','Courier New',Courier,monospace",X:0,aW:0,t:64,Y:48,aX:8.15427,u:"normal",Z:"break-word",v:"bold",i:"title",w:"Wordle",j:"absolute",x:"visible",k:"div",y:"preserve",z:113,aS:8,aT:8,a:-45,F:"center",b:6},"317":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box40",w:"",bF:"316",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:1,D:"#3A3A3C",k:"div",a:0,F:"center",b:0},"336":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box20",w:"",bF:"335",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:1,D:"#3A3A3C",k:"div",a:0,F:"center",b:0},"323":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box50",w:"",bF:"322",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:2,D:"#3A3A3C",k:"div",a:0,F:"center",b:0},"342":{k:"div",x:"visible",c:320,d:60,z:55,a:0,j:"absolute",b:271},"310":{k:"div",x:"visible",c:320,d:60,z:1,a:0,j:"absolute",b:76},"318":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box41",w:"",bF:"316",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:2,D:"#3A3A3C",k:"div",a:65,F:"center",b:0},"337":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box21",w:"",bF:"335",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:2,D:"#3A3A3C",k:"div",a:65,F:"center",b:0},"324":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box51",w:"",bF:"322",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:3,D:"#3A3A3C",k:"div",a:65,F:"center",b:0},"343":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box31",w:"",bF:"342",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:2,D:"#3A3A3C",k:"div",a:65,F:"center",b:0},"311":{b:0,z:1,K:"Solid",c:56,cP:"box",d:56,L:"Solid",M:2,cQ:1,N:2,f:0,bS:36,O:2,cR:1,g:"#121213",P:2,bF:"310",i:"box00",tX:0.5,j:"absolute",tY:0.5,k:"div",aY:0,X:0,A:"#3A3A3C",Y:60,B:"#3A3A3C",C:"#3A3A3C",s:"Arial,Helvetica,Sans-Serif",D:"#3A3A3C",t:36,E:0,F:"center",v:"bold",G:"#FFF",uB:0,w:"<br>",x:"visible",I:"Solid",gW:0,a:0,J:"Solid"},"319":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box42",w:"",bF:"316",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:3,D:"#3A3A3C",k:"div",a:130,F:"center",b:0},"330":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box12",w:"",bF:"329",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:3,D:"#3A3A3C",k:"div",a:130,F:"center",b:0},"338":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box22",w:"",bF:"335",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:3,D:"#3A3A3C",k:"div",a:130,F:"center",b:0},"325":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box52",w:"",bF:"322",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:5,D:"#3A3A3C",k:"div",a:130,F:"center",b:0},"344":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box32",w:"",bF:"342",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:3,D:"#3A3A3C",k:"div",a:130,F:"center",b:0},"312":{b:0,z:2,K:"Solid",c:56,cP:"box",d:56,L:"Solid",M:2,cQ:1,N:2,O:2,cR:1,g:"#121213",P:2,bF:"310",i:"box01",tX:0.5,j:"absolute",tY:0.5,k:"div",A:"#3A3A3C",Y:60,B:"#3A3A3C",C:"#3A3A3C",s:"Arial,Helvetica,Sans-Serif",D:"#3A3A3C",t:36,F:"center",v:"bold",G:"#FFF",w:"<br>",x:"visible",I:"Solid",gW:0,a:65,J:"Solid"},"331":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box13",w:"",bF:"329",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:4,D:"#3A3A3C",k:"div",a:195,F:"center",b:0},"339":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box23",w:"",bF:"335",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:4,D:"#3A3A3C",k:"div",a:195,F:"center",b:0},"307":{b:111,z:117,K:"None",c:320,L:"None",d:180,aS:0,M:0,e:1,N:0,aT:0,dB:"img",O:0,aU:0,P:0,h:"102",aV:0,i:"winImage",j:"absolute",k:"div",aI:40,aJ:40,aK:40,p:"no-repeat",A:"#FFF",aL:40,q:"100% 100%",B:"#FFF",r:"inline",C:"#FFF",cY:"1",D:"#FFF",x:"visible",I:"None",a:0,J:"None"},"326":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box53",w:"",bF:"322",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:6,D:"#3A3A3C",k:"div",a:195,F:"center",b:0},"345":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box33",w:"",bF:"342",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:4,D:"#3A3A3C",k:"div",a:195,F:"center",b:0},"313":{b:0,z:3,K:"Solid",c:56,cP:"box",d:56,L:"Solid",M:2,cQ:1,N:2,O:2,cR:1,g:"#121213",P:2,bF:"310",i:"box02",tX:0.5,j:"absolute",tY:0.5,k:"div",A:"#3A3A3C",Y:60,B:"#3A3A3C",C:"#3A3A3C",s:"Arial,Helvetica,Sans-Serif",D:"#3A3A3C",t:36,F:"center",v:"bold",G:"#FFF",w:"<br>",x:"visible",I:"Solid",gW:0,a:130,J:"Solid"},"332":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box14",w:"",bF:"329",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:5,D:"#3A3A3C",k:"div",a:260,F:"center",b:0},"308":{aU:8,G:"#000",c:139,aV:8,r:"inline",cY:"1",d:35,s:"Futura,Verdana,sans-serif",e:1,t:14,Y:36,g:"#FAF9F6",Z:"break-word",v:"bold",i:"invalidMessage",w:"Not in word list",aI:5,j:"absolute",x:"visible",k:"div",y:"preserve",aJ:5,z:115,aS:8,aK:5,aT:8,a:82,F:"center",aL:5,b:66},"327":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box54",w:"",bF:"322",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:7,D:"#3A3A3C",k:"div",a:260,F:"center",b:0},"346":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box34",w:"",bF:"342",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:5,D:"#3A3A3C",k:"div",a:260,F:"center",b:0},"314":{b:0,z:5,K:"Solid",c:56,cP:"box",d:56,L:"Solid",M:2,cQ:1,N:2,O:2,cR:1,g:"#121213",P:2,bF:"310",i:"box04",tX:0.5,j:"absolute",tY:0.5,k:"div",A:"#3A3A3C",Y:60,B:"#3A3A3C",C:"#3A3A3C",s:"Arial,Helvetica,Sans-Serif",D:"#3A3A3C",t:36,F:"center",v:"bold",G:"#FFF",w:"<br>",x:"visible",I:"Solid",gW:0,a:260,J:"Solid"},"333":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box10",w:"",bF:"329",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:1,D:"#3A3A3C",k:"div",a:0,F:"center",b:0},"309":{b:307,z:111,K:"Solid",c:206,L:"Solid",d:40,gg:"1",M:2,bD:"none",aS:6,N:2,aT:6,dB:"button",O:2,g:"#121213",aU:6,P:2,Q:5,aV:6,i:"playAgain",R:"#FFF",j:"absolute",S:0,k:"div",aI:4,T:0,aJ:4,aK:4,aL:4,A:"#3A3A3C",B:"#3A3A3C",aM:"50_hover",r:"inline",C:"#3A3A3C",Z:"break-word",D:"#3A3A3C",t:36,F:"center",aA:{a:[{p:4,h:"51"}]},G:"#FFF",aP:"pointer",w:"Play Again?",x:"visible",I:"Solid",a:49,y:"preserve",J:"Solid"},"320":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box43",w:"",bF:"316",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:4,D:"#3A3A3C",k:"div",a:195,F:"center",b:0},"328":{aU:8,G:"#000",c:139,aV:8,r:"inline",cY:"1",d:35,s:"Futura,Verdana,sans-serif",e:1,t:13,Y:36,g:"#FAF9F6",Z:"break-word",v:"bold",i:"letterCountError",w:"Not enough letters",aI:5,j:"absolute",x:"visible",k:"div",y:"preserve",aJ:5,z:116,aS:8,aK:5,aT:8,a:82,F:"center",aL:5,b:66},"347":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box30",w:"",bF:"342",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:1,D:"#3A3A3C",k:"div",a:0,F:"center",b:0},"315":{b:0,z:4,K:"Solid",c:56,cP:"box",d:56,L:"Solid",M:2,cQ:1,N:2,O:2,cR:1,g:"#121213",P:2,bF:"310",i:"box03",tX:0.5,j:"absolute",tY:0.5,k:"div",A:"#3A3A3C",Y:60,B:"#3A3A3C",C:"#3A3A3C",s:"Arial,Helvetica,Sans-Serif",D:"#3A3A3C",t:36,F:"center",v:"bold",G:"#FFF",w:"<br>",x:"visible",I:"Solid",gW:0,a:195,J:"Solid"},"334":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box11",w:"",bF:"329",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:2,D:"#3A3A3C",k:"div",a:65,F:"center",b:0},"321":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box44",w:"",bF:"316",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:5,D:"#3A3A3C",k:"div",a:260,F:"center",b:0},"329":{k:"div",x:"visible",c:320,d:60,z:19,a:0,j:"absolute",b:141},"340":{G:"#FFF",c:56,cP:"box",d:56,I:"Solid",s:"Arial,Helvetica,Sans-Serif",J:"Solid",t:36,Y:60,cR:1,L:"Solid",g:"#121213",K:"Solid",M:2,v:"bold",i:"box24",w:"",bF:"335",j:"absolute",N:2,O:2,B:"#3A3A3C",P:2,x:"visible",C:"#3A3A3C",A:"#3A3A3C",z:5,D:"#3A3A3C",k:"div",a:260,F:"center",b:0},"348":{aU:8,G:"#FFF",c:321,aV:8,r:"inline",d:97,s:"Helvetica,Arial,Sans-Serif",t:16,Z:"break-word",i:"keyboard",w:"   <div id=\"keyboard-cont\">\n        <div class=\"first-row\">\n            <button class=\"keyboard-button\">q</button>\n            <button class=\"keyboard-button\">w</button>\n            <button class=\"keyboard-button\">e</button>\n            <button class=\"keyboard-button\">r</button>\n            <button class=\"keyboard-button\">t</button>\n            <button class=\"keyboard-button\">y</button>\n            <button class=\"keyboard-button\">u</button>\n            <button class=\"keyboard-button\">i</button>\n            <button class=\"keyboard-button\">o</button>\n            <button class=\"keyboard-button\">p</button>\n        </div>\n        <div class=\"second-row\">\n            <button class=\"keyboard-button\">a</button>\n            <button class=\"keyboard-button\">s</button>\n            <button class=\"keyboard-button\">d</button>\n            <button class=\"keyboard-button\">f</button>\n            <button class=\"keyboard-button\">g</button>\n            <button class=\"keyboard-button\">h</button>\n            <button class=\"keyboard-button\">j</button>\n            <button class=\"keyboard-button\">k</button>\n            <button class=\"keyboard-button\">l</button>\n        </div>\n        <div class=\"third-row\">\n            <button style=\"font-size: x-small;\" class=\"keyboard-button\">Enter</button>\n            <button class=\"keyboard-button\">z</button>\n            <button class=\"keyboard-button\">x</button>\n            <button class=\"keyboard-button\">c</button>\n            <button class=\"keyboard-button\">v</button>\n            <button class=\"keyboard-button\">b</button>\n            <button class=\"keyboard-button\">n</button>\n            <button class=\"keyboard-button\">m</button>\n            <button class=\"keyboard-button\">Del</button>\n        </div>\n    </div>",j:"absolute",x:"visible",k:"div",y:"preserve",z:92,aS:8,aT:8,a:-9,b:461},"316":{k:"div",x:"visible",c:320,d:60,z:73,a:0,j:"absolute",b:336},"335":{k:"div",x:"visible",c:320,d:60,z:37,a:0,j:"absolute",b:206},"322":{k:"div",x:"visible",c:320,d:60,z:91,a:0,j:"absolute",b:401},"341":{b:375,z:93,K:"Solid",L:"Solid",gg:"1",aS:8,M:1,yy:"nowrap",N:1,aT:8,O:1,aU:8,P:1,Q:8,aV:8,i:"showWord",R:"#000",j:"absolute",S:0,k:"div",aI:6,T:0,l:0,aJ:6,m:"#000",n:"#AAA",aK:6,aL:6,Z:"break-word",r:"inline",cY:"0",s:"'Arial Black',Gadget,Sans-Serif",t:24,v:"bold",G:"#FFF",w:"WAGER",x:"visible",I:"Solid",a:101,y:"preserve",J:"Solid"}}}],{},h,{},null,false,false,-1,true,false,false,true,true);d[f]=c.API;document.getElementById(g).setAttribute("HYP_dn",f);c.z_o(this.body)})();})();
