const main =document.querySelector('main');
const voiceSelect=document.getElementById('voices');
const textarea=document .getElementById('text');
const Readbtn=document.getElementById('read');
const toggleBtn=document.getElementById('toggle');
const closeBtn=document.getElementById('close');

const data =[
{
    image:'./Pictures/Thirsty.gif',
    text : " I'm Thirsty"
},
{
    image:'./Pictures/Hungry.gif',
    text:"I'm Hungry "
},
{
    image:'./Pictures/Exhausted.jpg',
    text:"I'm Tired"
},
{
    image:'./Pictures/Hurts.gif',
    text:"I'm Hurt"
},
{
    image:'./Pictures/Happy.jpeg',
    text:"I'm Happy"
},
{
    image:'./Pictures/Angry.gif',
    text:"I'm Angry"
},
{
    image:'./Pictures/d44.gif',
    text:"I'm Sad"
},
{
    image:'./Pictures/Outside.gif',
    text:"I Want To Go Outside"
},
{
    image:'./Pictures/Home.gif',
    text:"I Want To Go Home "
},
{
    image:'./Pictures/Scared.jpg',
    text:"I'm Scared"
}
];

data.forEach(createbox);


function createbox(item){
    const box= document.createElement('div');
    const {image,text}=item;// same as item.image and item.text

box.classList.add('box') ;
box.innerHTML=` 
<img src ="${image}" alt = ${text}/>

<p class = "info">

<span>${text}</span></p>

`;
box.addEventListener('click',()=>{
    setTextMessage(text);
    speakText();
    // Add active effect
    box.classList.add('active');
    setTimeout(()=>box.classList.remove('active'),800);
    });
main.appendChild(box);

}


// Initialising speech synthesis utterance
const message= new SpeechSynthesisUtterance();


let voices =[];
function getVoices() {
    voices=speechSynthesis.getVoices();
    //The getVoices() method of the speechSynthesis object returns an array of available SpeechSynthesisVoice objects representing the voices that can be used for speech synthesis.
voices.forEach(voice =>{
const option =document.createElement('option');
option.value=voice.name;
option.innerText=`${voice.name} ${voice.lang}`
voiceSelect.appendChild(option);
});
}
// Set text 
function setTextMessage(text){
    message.text=text;
}
//Speak text
function speakText(){
speechSynthesis.speak(message);
}
// set voice

function setVoice(e){
    message.voice=voices.find(voice=>voice.name===e.target.value);
}
// Voice changes
speechSynthesis.addEventListener('voiceschanged',getVoices);
getVoices();



toggleBtn.addEventListener('click',()=>document.getElementById('text-box').classList.toggle('show'));
closeBtn.addEventListener('click',()=>document.getElementById('text-box').classList.remove('show'));

//change voice
voiceSelect.addEventListener('change',setVoice);
//read text button
Readbtn.addEventListener('click',()=>{
    setTextMessage(textarea.value);
speakText();
})

