import React, { useEffect, useMemo, useState, useRef } from 'react'
import './home.css'
import pic from './assets/pic.jpeg'
import adminImage from './assets/admin.png'
import tesseractImage from './assets/tesseract.png'
import hiraethImage from './assets/hiraeth.png'
import dharoharImage from './assets/dharohar.png'

const LETTER_STEP_MS = 120
const HOLD_DURATION_MS = 1500
const DEFAULT_GITHUB_URL = 'https://github.com/Shreyaa6'

const TECH_STACKS = [
  { 
    name: 'React', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#B9B9B9" d="M49.802 58.8c4.852 0 8.713-3.9 8.713-8.8s-3.861-8.8-8.713-8.8-8.713 3.9-8.713 8.8 3.861 8.8 8.713 8.8"/><path stroke="#B9B9B9" strokeWidth="5" d="M49.802 68.1c25.842 0 46.832-8.1 46.832-18.1s-20.99-18.1-46.832-18.1S2.97 40 2.97 50s20.99 18.1 46.832 18.1Z"/><path stroke="#B9B9B9" strokeWidth="5" d="M34.356 59c12.872 22.7 30.297 37 38.911 32 8.515-5 5.05-27.4-7.92-50C52.377 18.3 34.95 4 26.436 9c-8.614 5-5.05 27.4 7.92 50Z"/><path stroke="#B9B9B9" strokeWidth="5" d="M34.357 41c-12.97 22.6-16.436 45-7.921 50 8.514 5 25.94-9.3 38.812-32 12.97-22.6 16.534-45 8.02-50-8.615-5-26.04 9.3-38.912 32Z"/></svg>
  },
  { 
    name: 'JavaScript', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clipPath="url(#a)"><path fill="#D1D1D1" d="M100 0H0v100h100z"/><path fill="#000" d="M67.2 78.1c2 3.3 4.6 5.7 9.3 5.7 3.9 0 6.4-1.9 6.4-4.6 0-3.2-2.6-4.4-6.8-6.2l-2.3-1c-6.8-2.9-11.3-6.5-11.3-14.2 0-7 5.4-12.4 13.8-12.4 6 0 10.3 2.1 13.4 7.5l-7.3 4.7c-1.6-2.9-3.3-4-6-4-2.8 0-4.5 1.7-4.5 4 0 2.8 1.7 4 5.8 5.7l2.3 1c8 3.4 12.5 6.9 12.5 14.8 0 8.5-6.6 13.1-15.6 13.1-8.7 0-14.4-4.2-17.1-9.6zm-33.2.8c1.5 2.6 2.8 4.8 6 4.8 3.1 0 5-1.2 5-5.9v-32h9.4V78c0 9.7-5.7 14.2-14 14.2-7.5 0-11.9-3.9-14.1-8.6z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
  },
  { 
    name: 'Node.js', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#A8A8A8" d="M46.3 1.1c2.5-1.4 5.7-1.4 8.2 0 12.5 7 24.9 14.1 37.4 21.1 2.3 1.3 3.9 3.9 3.9 6.6v42.4c0 2.8-1.7 5.5-4.2 6.8-12.4 7-24.8 14-37.3 21-2.5 1.4-5.8 1.3-8.3-.2-3.7-2.2-7.5-4.3-11.2-6.5-.8-.5-1.6-.8-2.2-1.6.5-.6 1.3-.7 2-1 1.6-.5 3-1.3 4.4-2.1.4-.2.8-.2 1.1.1 3.2 1.8 6.3 3.7 9.5 5.5.7.4 1.4-.1 2-.5C64 85.9 76.2 79.1 88.3 72.2c.5-.2.7-.7.7-1.2V29.1c.1-.6-.3-1.1-.8-1.3-12.4-7-24.8-14-37.1-20.9-.2-.1-.5-.2-.7-.2-.3 0-.5.1-.7.2-12.4 7-24.7 14-37.1 20.9-.6.2-.9.7-.9 1.2v41.9c0 .2 0 .5.2.7.1.2.3.4.5.5 3.3 1.9 6.6 3.7 9.9 5.6 1.9 1 4.1 1.6 6.2.8 1.8-.6 3.1-2.5 3-4.4V32.4c0-.6.5-1.1 1.1-1.1h4.8c.7 0 1.1.6 1 1.3v42c0 3.7-1.5 7.8-5 9.6-4.2 2.2-9.5 1.7-13.7-.4-3.6-1.8-7.1-4-10.7-5.9-2.3-1.2-4-3.9-4-6.7V28.8c0-2.8 1.6-5.4 4-6.7 12.4-7 24.9-14 37.3-21"/><path fill="#A8A8A8" d="M57.1 30.4c5.4-.3 11.2-.2 16.1 2.5 3.8 2 5.9 6.3 5.9 10.5-.1.6-.7.9-1.2.8h-4.7c-.7 0-1.1-.6-1.1-1.2-.5-2-1.5-4-3.4-5-2.9-1.5-6.3-1.4-9.4-1.3-2.3.1-4.8.3-6.7 1.7-1.5 1-2 3.1-1.4 4.8.5 1.2 1.9 1.6 3 1.9 6.5 1.7 13.4 1.5 19.8 3.8 2.7.9 5.2 2.7 6.2 5.5 1.2 3.7.7 8.2-2 11.2-2.1 2.5-5.3 3.8-8.4 4.5-4.3.9-8.6.9-12.8.5-4-.5-8.1-1.5-11.1-4.2-2.6-2.3-3.9-5.8-3.8-9.2 0-.6.6-1 1.2-.9H48c.6 0 1.1.5 1.1 1.1.3 1.9 1 3.9 2.7 5.1 3.2 2.1 7.3 1.9 10.9 2 3.1-.1 6.5-.2 9-2.2 1.3-1.2 1.7-3.1 1.3-4.7-.4-1.4-1.8-2-3.1-2.5-6.4-2-13.4-1.3-19.8-3.6-2.6-.9-5.1-2.6-6.1-5.3-1.4-3.8-.8-8.4 2.2-11.3 2.9-3 7-4.1 10.9-4.5"/></svg>
  },
  { 
    name: 'Express', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#000" d="M31.015 61.315V39.437h1.187v3.441q.21-.23.387-.485a5.88 5.88 0 0 1 5.364-3.329c2.706-.08 4.905.921 6.197 3.329a10.7 10.7 0 0 1 .258 9.808c-1.204 2.698-4.177 4.04-7.36 3.547a5.95 5.95 0 0 1-4.751-3.135v8.701zm1.187-14.14.266 2.57c.469 2.924 2.198 4.652 4.912 4.977a5.58 5.58 0 0 0 6.132-3.547 9.52 9.52 0 0 0-.209-7.821 5.47 5.47 0 0 0-5.76-3.184 5.33 5.33 0 0 0-4.759 3.935 27 27 0 0 0-.582 3.07m37.499 2.974a6.4 6.4 0 0 1-6.254 5.656c-4.977.25-7.312-3.054-7.683-6.868a11 11 0 0 1 .97-6.06 6.76 6.76 0 0 1 7.036-3.773 6.47 6.47 0 0 1 5.736 4.92 33 33 0 0 1 .557 3.637h-13.07c-.242 3.458 1.616 6.237 4.25 6.908 3.28.807 6.083-.614 7.101-3.733.226-.8.638-.914 1.365-.687zm-12.717-3.595h11.69c-.073-3.684-2.366-6.36-5.478-6.391-3.512-.057-6.06 2.513-6.212 6.391m15.133 3.676h1.146a4.59 4.59 0 0 0 2.698 3.959 7.06 7.06 0 0 0 6.124-.161 2.75 2.75 0 0 0 1.616-2.707 2.496 2.496 0 0 0-1.68-2.497c-1.26-.469-2.602-.727-3.886-1.14a28.5 28.5 0 0 1-3.91-1.429c-2.07-1.01-2.198-4.944.145-6.19a8.25 8.25 0 0 1 7.885-.121 4.15 4.15 0 0 1 2.101 4.234h-.982c0-.048-.09-.09-.09-.138-.121-3.133-2.755-4.113-5.582-3.837a7.1 7.1 0 0 0-2.424.734 2.42 2.42 0 0 0-1.405 2.424 2.42 2.42 0 0 0 1.616 2.279c1.234.453 2.544.743 3.821 1.098l3.086.807a3.645 3.645 0 0 1 2.504 3.289 3.89 3.89 0 0 1-2.092 4.04c-2.698 1.526-7.142 1.123-9.122-.808a5.4 5.4 0 0 1-1.566-3.837zm27.323-6.051h-1.075c0-.146-.057-.285-.073-.396a3.51 3.51 0 0 0-2.86-3.377 7.05 7.05 0 0 0-4.532.218 2.75 2.75 0 0 0-1.996 2.626 2.535 2.535 0 0 0 1.939 2.553l4.912 1.26q.796.192 1.566.477a4.05 4.05 0 0 1 2.677 3.687 4.03 4.03 0 0 1-2.468 3.835 9 9 0 0 1-7.271.074 5.04 5.04 0 0 1-3.038-4.897h1.05a5.89 5.89 0 0 0 8.968 3.75 2.89 2.89 0 0 0 1.55-2.698 2.5 2.5 0 0 0-1.704-2.481c-1.261-.47-2.602-.719-3.886-1.14a29 29 0 0 1-3.934-1.413c-2.02-.994-2.182-4.896.121-6.14a8.14 8.14 0 0 1 8.015-.09 4.23 4.23 0 0 1 2.028 4.145zm-70.377 11.23a1.85 1.85 0 0 1-2.295-.872L22.59 48.76l-.605-.807-4.848 6.593a1.776 1.776 0 0 1-2.181.856l6.245-8.378-5.81-7.57a1.93 1.93 0 0 1 2.302.807l4.329 5.848 4.355-5.826a1.736 1.736 0 0 1 2.165-.808l-2.255 2.992-3.054 3.975a.81.81 0 0 0 0 1.204l5.817 7.764zm26.516-16.036v1.14a5.86 5.86 0 0 0-6.238 6.05v8.888h-1.155V39.444h1.14v3.28c1.397-2.392 3.554-3.28 6.26-3.344zM.002 46.92l.509-2.514c1.397-4.968 7.094-7.036 11.013-3.958 2.294 1.801 2.867 4.354 2.755 7.231H1.35c-.209 5.138 3.498 8.24 8.24 6.657a4.94 4.94 0 0 0 3.127-3.482c.25-.807.665-.946 1.422-.712a6.56 6.56 0 0 1-3.135 4.791 7.595 7.595 0 0 1-8.847-1.13A7.96 7.96 0 0 1 .17 49.132c0-.285-.095-.551-.162-.807Q0 47.605 0 46.919zm1.365-.348h11.69c-.072-3.724-2.423-6.367-5.558-6.391-3.49-.048-5.987 2.537-6.14 6.375z"/></svg>
  },
  { 
    name: 'MongoDB', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clipPath="url(#a)"><path fill="#797979" d="m50.1.3 2.7 5c.6.9 1.2 1.7 2 2.5 2.2 2.2 4.3 4.6 6.3 7.1 4.5 5.9 7.6 12.5 9.7 19.7 1.3 4.4 2 8.8 2.1 13.3.2 13.5-4.4 25.1-13.7 34.7-1.5 1.5-3.2 2.9-4.9 4.2-.9 0-1.4-.7-1.7-1.4-.7-1.2-1.2-2.5-1.4-3.9-.3-1.6-.5-3.3-.4-5v-.8c-.2 0-1-75-.7-75.4"/><path fill="#8E8E8E" d="M50.1.1c-.1-.2-.2-.1-.3.1.1 1.1-.3 2.1-.9 3-.7.9-1.5 1.6-2.4 2.4-4.8 4.2-8.7 9.3-11.7 14.9-4.1 7.6-6.2 15.8-6.7 24.4-.3 3.1 1 14.1 2 17.2 2.7 8.4 7.5 15.4 13.7 21.5 1.5 1.5 3.2 2.8 4.8 4.1.5 0 .5-.4.7-.8.2-.7.4-1.4.5-2.1l1.1-8.2z"/><path fill="silver" d="M52.8 90.1c.1-1.2.7-2.3 1.4-3.3-.7-.3-1.1-.8-1.5-1.4-.3-.6-.6-1.2-.8-1.8-.8-2.3-.9-4.7-1.1-7v-1.4c-.3.2-.3 2.1-.3 2.3-.2 2.5-.5 4.9-1 7.4-.2 1-.3 2-.9 2.8 0 .1 0 .2.1.4 1 2.9 1.2 5.8 1.4 8.8V98c0 1.3-.1 1 1 1.5.4.2.9.2 1.4.5.3 0 .4-.3.4-.5l-.2-1.8v-5c-.2-.9 0-1.7.1-2.6"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
  },
  { 
    name: 'SQL', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g fill="#3D3D3D" clipPath="url(#a)"><path d="M92.1 77.1c-5.4-.1-9.7.4-13.2 1.9-1 .4-2.7.4-2.8 1.7.5.6.6 1.5 1.1 2.2.8 1.4 2.2 3.2 3.5 4.2 1.4 1.1 2.9 2.2 4.4 3.2 2.7 1.7 5.6 2.6 8.2 4.3 1.5 1 3 2.2 4.5 3.2.7.6 1.2 1.4 2.2 1.8v-.2c-.5-.6-.6-1.5-1.1-2.2-.7-.7-1.4-1.3-2-2-2-2.7-4.4-5-7.1-7-2.2-1.5-6.9-3.6-7.8-6.1l-.1-.1c1.5-.1 3.3-.7 4.7-1.1 2.3-.6 4.4-.5 6.8-1.1 1.1-.3 2.2-.6 3.3-1v-.6c-1.2-1.2-2.1-2.9-3.4-4.1-3.5-3-7.3-6-11.2-8.5-2.1-1.4-4.8-2.3-7.1-3.5-.8-.4-2.2-.6-2.7-1.3-1.2-1.5-1.9-3.5-2.8-5.3-2-3.8-3.9-8-5.6-12-1.2-2.7-2-5.4-3.5-7.9-7-11.7-14.6-18.8-26.3-25.8-2.5-1.4-5.5-2.1-8.7-2.8l-5.1-.3c-1.1-.5-2.2-1.8-3.1-2.4C13.3 1.8 3.3-3.6.4 3.5-1.4 8 3.1 12.4 4.7 14.7c1.2 1.6 2.7 3.4 3.5 5.2.5 1.2.6 2.4 1.1 3.7 1.1 3 2.1 6.4 3.5 9.3.7 1.4 1.6 3 2.5 4.3.5.8 1.5 1.1 1.7 2.3-1 1.4-1 3.5-1.6 5.2-2.4 7.8-1.5 17.5 2 23.2 1.1 1.7 3.7 5.5 7.1 4.1 3.1-1.2 2.4-5.2 3.3-8.6.2-.8.1-1.4.5-1.9v.1c1 1.9 1.9 3.8 2.8 5.7 2.1 3.4 5.8 6.9 8.8 9.3 1.6 1.2 2.9 3.4 5 4.1v-.2h-.1c-.4-.6-1-.9-1.6-1.4-1.2-1.2-2.6-2.8-3.5-4.1-2.9-3.9-5.4-8.1-7.6-12.6-1.1-2.1-2-4.5-2.9-6.6-.4-.8-.4-2.1-1.1-2.5-1 1.5-2.5 2.8-3.3 4.7-1.3 3-1.4 6.6-1.9 10.4-.3.1-.1 0-.3.1-2.2-.6-2.9-2.8-3.7-4.8-2-4.9-2.4-12.8-.6-18.4.5-1.5 2.5-6 1.7-7.4-.4-1.3-1.8-2.1-2.5-3.1-.9-1.3-1.8-3-2.4-4.4-1.6-3.9-2.4-8.1-4.2-12-.9-1.9-2.4-3.7-3.5-5.4-1.3-1.9-2.7-3.2-3.7-5.4-.3-.8-.8-2-.3-2.8.1-.6.4-.8 1-.9.9-.8 3.4.2 4.3.6 2.5 1 4.6 2 6.7 3.5 1 .7 2 2 3.2 2.3H20c2.2.5 4.6.1 6.7.8 3.6 1.2 6.9 2.9 9.8 4.8 8.9 5.7 16.3 13.9 21.2 23.6.8 1.6 1.2 3 1.9 4.7 1.4 3.4 3.2 6.8 4.6 10.1 1.4 3.2 2.8 6.6 4.8 9.3 1 1.4 5.1 2.2 6.9 3 1.4.6 3.5 1.2 4.7 1.9 2.3 1.4 4.6 3.1 6.8 4.7 1.1.8 4.5 2.5 4.7 3.9"/><path d="M22.7 17.1c-1.2 0-2 .1-2.8.3v.1h.1c.5 1.1 1.5 1.9 2.2 2.8.5 1.1 1 2.2 1.6 3.3l.1-.1c1-.7 1.4-1.8 1.4-3.5-.4-.5-.5-1-.8-1.4-.3-.6-1.2-1-1.8-1.5"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
  },
  { 
    name: 'HTML', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#E34F26" d="M14 90 6 0h88.2l-8 90L50 100"/><path fill="#EF652A" d="M50.1 92.3v-85h36l-6.9 76.8"/><path fill="#EBEBEB" d="M22.4 18.4h27.7v11H34.5l1 11.3h14.6v11H25.4zm3.5 38.9H37l.8 8.8 12.3 3.3v11.5l-22.7-6.3"/><path fill="#fff" d="M77.7 18.4H50v11h26.6zm-2 22.3H50v11h13.6L62.3 66 50 69.4v11.5l22.6-6.3"/></svg>
  },
  { 
    name: 'CSS', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#525252" d="m94.2 0-8 90L50 100 14 90 6 0z"/><path fill="#626262" d="m79.3 84.3 6.9-76.9h-36v85z"/><path fill="#EBEBEB" d="m24.4 40.7 1 11h24.7v-11zm25.7-22.3H22.4l1 11h26.7zm0 62.5V69.4l-12.3-3.3-.8-8.8H25.9l1.5 17.3z"/><path fill="#fff" d="m63.6 51.8-1.3 14.3L50 69.4v11.5l22.6-6.3.2-1.9 2.6-29.1.3-3 2-22.3H50v11h15.6l-1 11.3H50v11h13.6z"/></svg>
  },
  { 
    name: 'Next.js', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clipPath="url(#a)"><path fill="#000" d="M50 100c27.6 0 50-22.4 50-50S77.6 0 50 0 0 22.4 0 50s22.4 50 50 50"/><path fill="url(#b)" d="M83.1 87.5 38.4 30H30v40h6.7V38.5l41 53c1.9-1.2 3.7-2.5 5.4-4"/><path fill="url(#c)" d="M70.6 30h-6.7v40h6.7z"/></g><defs><linearGradient id="b" x1="51.794" x2="71.517" y1="71.791" y2="96.235" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><linearGradient id="c" x1="67.299" x2="67.187" y1="29.987" y2="59.362" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
  },
  { 
    name: 'TypeScript', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clipPath="url(#a)"><path fill="#5F5F5F" d="M0 0h100v100H0z"/><path fill="#fff" d="M48 37h4.8v8.3h-13v36.8l-.3.1c-.5.1-6.6.1-8 0l-1.1-.1V45.3h-13V37zm36.6 41.3c-1.9 2-4 3.1-7.4 4.1-1.5.4-1.7.4-5.1.4-3.3 0-3.6 0-5.2-.4-4.2-1.1-7.6-3.2-9.9-6.2-.7-.8-1.7-2.6-1.7-2.8 0-.1.2-.2.4-.3s.6-.4 1-.6c.3-.2 1-.6 1.4-.8s1.6-.9 2.7-1.6c1.1-.6 2-1.2 2.1-1.2s.3.2.5.5c.9 1.6 3.1 3.6 4.7 4.3 1 .4 3.1.9 4.1.9.9 0 2.7-.4 3.6-.8 1-.5 1.5-.9 2.1-1.8.4-.6.5-.8.4-2 0-1.1-.1-1.4-.4-2-.9-1.4-2.1-2.2-6.9-4.3-5-2.2-7.2-3.5-9-5.3-1.3-1.3-1.6-1.7-2.5-3.3-1.1-2.1-1.2-2.8-1.2-5.9 0-2.2 0-2.9.3-3.7.3-1.1 1.4-3.3 1.9-3.8 1-1.2 1.4-1.5 2.1-2.1 2.1-1.8 5.4-2.9 8.6-3 .4 0 1.5.1 2.7.1 3.2.3 5.4 1 7.5 2.7 1.6 1.2 4 4.2 3.7 4.6-.2.2-6.4 4.4-6.8 4.5-.2.1-.4 0-.8-.4-2.1-2.5-3-3.1-5-3.2-1.5-.1-2.2.1-3.2.7-1 .7-1.5 1.7-1.5 3.2 0 2.1.8 3.1 3.8 4.6 1.9 1 3.6 1.7 3.7 1.7.2 0 4.2 2 5.2 2.6 4.9 2.9 6.9 5.8 7.4 10.9.1 3.7-.9 7.2-3.3 9.7"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
  },
  { 
    name: 'Git', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clipPath="url(#a)"><path fill="#757575" d="M98.1 45.5 54.5 1.9c-2.5-2.5-6.6-2.5-9.1 0L36.3 11l11.5 11.5c2.7-.9 5.7-.3 7.9 1.8 2.1 2.1 2.7 5.2 1.8 7.9l11.1 11.1c2.7-.9 5.8-.3 7.9 1.8 3 3 3 7.8 0 10.8s-7.8 3-10.8 0a7.65 7.65 0 0 1-1.7-8.3L53.6 37.3v27.2c.7.4 1.4.9 2 1.4 3 3 3 7.8 0 10.8s-7.8 3-10.8 0-3-7.8 0-10.8c.7-.7 1.6-1.3 2.5-1.7V36.8c-.9-.4-1.8-1-2.5-1.7-2.3-2.3-2.8-5.6-1.7-8.4L31.8 15.4 1.9 45.3c-2.5 2.5-2.5 6.6 0 9.1l43.7 43.7c2.5 2.5 6.6 2.5 9.1 0l43.5-43.5c2.4-2.5 2.4-6.5-.1-9.1"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
  },
  { 
    name: 'Python', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clipPath="url(#a)"><path fill="url(#b)" d="M49.6 0C24.3 0 25.8 11 25.8 11v11.4H50v3.4H16.2S0 24 0 49.6s14.2 24.7 14.2 24.7h8.5V62.4s-.5-14.2 14-14.2h24s13.5.2 13.5-13V13.3c-.1 0 2-13.3-24.6-13.3M36.3 7.7c.6 0 1.1.1 1.7.3.5.2 1 .5 1.4.9s.7.9.9 1.4.3 1.1.3 1.7-.1 1.1-.3 1.7c-.2.5-.5 1-.9 1.4s-.9.7-1.4.9-1.1.3-1.7.3-1.1-.1-1.7-.3-1-.5-1.4-.9-.7-.9-.9-1.4-.3-1.1-.3-1.7.1-1.1.3-1.7c.2-.5.5-1 .9-1.4s.9-.7 1.4-.9 1.1-.3 1.7-.3"/><path fill="url(#c)" d="M50.4 99.5c25.4 0 23.8-11 23.8-11V77.1H49.9v-3.4h33.8s16.2 1.8 16.2-23.8-14.2-24.7-14.2-24.7h-8.5V37s.5 14.2-14 14.2h-24s-13.5-.2-13.5 13v21.9c.2.1-1.9 13.4 24.7 13.4m13.3-7.7c-.6 0-1.1-.1-1.7-.3-.5-.2-1-.5-1.4-.9s-.7-.9-.9-1.4-.3-1.1-.3-1.7.1-1.1.3-1.7c.2-.5.5-1 .9-1.4s.9-.7 1.4-.9 1.1-.3 1.7-.3 1.1.1 1.7.3c.5.2 1 .5 1.4.9s.7.9.9 1.4.3 1.1.3 1.7-.1 1.1-.3 1.7c-.2.5-.5 1-.9 1.4s-.9.7-1.4.9-1.1.3-1.7.3"/></g><defs><linearGradient id="b" x1="9.308" x2="58.865" y1="9.253" y2="58.316" gradientUnits="userSpaceOnUse"><stop stopColor="#6F6F6F"/><stop offset="1" stopColor="#5E5E5E"/></linearGradient><linearGradient id="c" x1="39.745" x2="92.964" y1="40.752" y2="91.061" gradientUnits="userSpaceOnUse"><stop stopColor="#DADADA"/><stop offset="1" stopColor="#C5C5C5"/></linearGradient><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
  },
  { 
    name: 'Tailwind', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#848484" d="M50 20c-13.3 0-21.7 6.7-25 20 5-6.7 10.8-9.2 17.5-7.5 3.8 1 6.5 3.7 9.5 6.8 4.9 5 10.6 10.7 23 10.7 13.3 0 21.7-6.7 25-20-5 6.7-10.8 9.2-17.5 7.5-3.8-1-6.5-3.7-9.5-6.8C68.1 25.8 62.4 20 50 20M25 50C11.7 50 3.3 56.7 0 70c5-6.7 10.8-9.2 17.5-7.5 3.8 1 6.5 3.7 9.5 6.8 4.9 5 10.6 10.7 23 10.7 13.3 0 21.7-6.7 25-20-5 6.7-10.8 9.2-17.5 7.5-3.8-.9-6.5-3.7-9.5-6.8C43.1 55.8 37.4 50 25 50"/></svg>
  },
  { 
    name: 'Canva', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clipPath="url(#a)"><path fill="#585858" d="M50 100c27.6 0 50-22.4 50-50S77.6 0 50 0 0 22.4 0 50s22.4 50 50 50"/><path fill="url(#b)" d="M50 100c27.6 0 50-22.4 50-50S77.6 0 50 0 0 22.4 0 50s22.4 50 50 50"/><path fill="url(#c)" d="M50 100c27.6 0 50-22.4 50-50S77.6 0 50 0 0 22.4 0 50s22.4 50 50 50"/><path fill="url(#d)" d="M50 100c27.6 0 50-22.4 50-50S77.6 0 50 0 0 22.4 0 50s22.4 50 50 50"/><path fill="url(#e)" d="M50 100c27.6 0 50-22.4 50-50S77.6 0 50 0 0 22.4 0 50s22.4 50 50 50"/><path fill="#fff" d="M71.6 60.3c-.4 0-.8.3-1.2 1.1-4.2 8.6-11.6 14.7-20.1 14.7-9.9 0-16-8.9-16-21.2C34.3 34.1 45.9 22 56.1 22c4.8 0 7.7 3 7.7 7.8 0 5.7-3.2 8.6-3.2 10.6 0 .9.6 1.4 1.7 1.4 4.4 0 9.6-5.1 9.6-12.3 0-7-6.1-12.1-16.3-12.1-16.8 0-31.8 15.6-31.8 37.2 0 16.7 9.6 27.8 24.3 27.8 15.6 0 24.7-15.6 24.7-20.6 0-1-.6-1.5-1.2-1.5"/></g><defs><radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="rotate(-49.416 105.988 23.31)scale(77.3416)" gradientUnits="userSpaceOnUse"><stop stopColor="#4D4D4D"/><stop offset="1" stopColor="#4D4D4D" stopOpacity="0"/></radialGradient><radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="rotate(54.703 2.22 31.242)scale(87.2168)" gradientUnits="userSpaceOnUse"><stop stopColor="#8A8A8A"/><stop offset="1" stopColor="#8A8A8A" stopOpacity="0"/></radialGradient><radialGradient id="d" cx="0" cy="0" r="1" gradientTransform="matrix(53.84245 -54.2102 24.93201 24.76288 19.334 88.608)" gradientUnits="userSpaceOnUse"><stop stopColor="#4D4D4D"/><stop offset="1" stopColor="#4D4D4D" stopOpacity="0"/></radialGradient><radialGradient id="e" cx="0" cy="0" r="1" gradientTransform="rotate(66.52 10.146 37.914)scale(78.7295 131.889)" gradientUnits="userSpaceOnUse"><stop stopColor="#8A8A8A" stopOpacity=".726"/><stop offset="0" stopColor="#8A8A8A"/><stop offset="1" stopColor="#8A8A8A" stopOpacity="0"/></radialGradient><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
  },
  { 
    name: 'GitHub', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#161616" d="M50 1C22.4 1 0 23.4 0 51c0 22.1 14.3 40.8 34.2 47.4 2.5.5 3.4-1.1 3.4-2.4 0-1.2 0-5.1-.1-9.3-13.9 3-16.8-5.9-16.8-5.9-2.3-5.8-5.6-7.3-5.6-7.3-4.5-3.1.3-3 .3-3 5 .4 7.7 5.2 7.7 5.2 4.5 7.6 11.7 5.4 14.6 4.2.4-3.2 1.7-5.4 3.2-6.7-11.1-1.3-22.8-5.6-22.8-24.7 0-5.5 2-9.9 5.2-13.4-.5-1.3-2.2-6.3.5-13.2 0 0 4.2-1.3 13.8 5.1 4-1.1 8.3-1.7 12.5-1.7s8.5.6 12.5 1.7c9.5-6.5 13.7-5.1 13.7-5.1 2.7 6.9 1 12 .5 13.2 3.2 3.5 5.1 8 5.1 13.4 0 19.2-11.7 23.4-22.8 24.7 1.8 1.6 3.4 4.6 3.4 9.3 0 6.7-.1 12.1-.1 13.7 0 1.3.9 2.9 3.4 2.4C85.7 91.8 100 73.1 100 51c0-27.6-22.4-50-50-50"/><path fill="#161616" d="M18.7 72.2c-.1.2-.5.3-.9.2-.4-.2-.6-.5-.4-.8.1-.3.5-.3.9-.2.3.2.6.6.4.8m2.5 2.2c-.2.2-.7.1-1-.2s-.4-.8-.1-1c.2-.2.7-.1 1 .2s.3.8.1 1m1.7 2.8c-.3.2-.8 0-1.1-.4s-.3-1 0-1.2.8 0 1.1.4c.3.5.3 1 0 1.2m2.8 3.3c-.3.3-.9.2-1.3-.2s-.6-1-.3-1.3.9-.2 1.3.2c.5.4.6 1 .3 1.3m3.7 1.1c-.1.4-.7.6-1.2.4-.6-.2-.9-.6-.8-1s.7-.6 1.3-.4c.5.1.8.6.7 1m4.2.4c0 .4-.5.8-1.1.8s-1.1-.3-1.1-.7.5-.8 1.1-.8 1.1.3 1.1.7m4.1-.1c.1.4-.3.8-.9.9s-1.1-.1-1.2-.5.3-.8.9-.9c.6-.2 1.2.1 1.2.5"/></svg>
  }
]

function Home() {
  const roles = useMemo(
    () => [
      'Web Developer',
      // 'Enthusiast',
      'Photographer',
      'Creative Thinker',
      'Fast Learner',
      'Freelancer',
    ],
    [],
  )

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedRole, setDisplayedRole] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const carouselRef = useRef(null)
  const cardsRef = useRef({})
  const projectsSectionRef = useRef(null)
  const projectsLineRef = useRef(null)

  useEffect(() => {
    const role = roles[roleIndex]
    const timers = []

    setDisplayedRole('')

    role.split('').forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setDisplayedRole(role.slice(0, index + 1))
        }, index * LETTER_STEP_MS),
      )
    })

    timers.push(
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, role.length * LETTER_STEP_MS + HOLD_DURATION_MS),
    )

    return () => {
      timers.forEach((timerId) => clearTimeout(timerId))
    }
  }, [roleIndex, roles])

  useEffect(() => {
    const updateCardScales = () => {
      if (!carouselRef.current) return

      const carousel = carouselRef.current
      const carouselRect = carousel.getBoundingClientRect()
      const carouselCenter = carouselRect.left + carouselRect.width / 2

      Object.values(cardsRef.current).forEach((card) => {
        if (!card) return
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distanceFromCenter = Math.abs(cardCenter - carouselCenter)
        const maxDistance = carouselRect.width / 2
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1)
        
        // Scale: smaller in center (0.75), larger on sides (1.15)
        const scale = 0.75 + (normalizedDistance * 0.4)
        const opacity = 0.5 + (normalizedDistance * 0.5)
        
        card.style.transform = `scale(${scale})`
        card.style.opacity = opacity
      })
    }

    const handleScroll = () => {
      updateCardScales()
    }

    const interval = setInterval(updateCardScales, 50)
    window.addEventListener('scroll', handleScroll)
    updateCardScales()

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const updateScrollProgress = () => {
      if (!projectsSectionRef.current) return

      const section = projectsSectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY || window.pageYOffset
      
      // Get section position relative to document
      const sectionTop = section.offsetTop
      const sectionHeight = rect.height
      const scrollableHeight = Math.max(0, sectionHeight - windowHeight)
      
      if (scrollableHeight <= 0) {
        setScrollProgress(0)
        return
      }

      // Calculate scroll progress
      // When section enters viewport (top at viewport top), progress starts at 0
      // When section exits viewport (bottom at viewport bottom), progress reaches 1
      const scrolled = Math.max(0, scrollY - sectionTop)
      const progress = Math.min(1, Math.max(0, scrolled / scrollableHeight))
      
      setScrollProgress(progress)
    }

    const handleScroll = () => {
      updateScrollProgress()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileNavOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobileNavOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      // Restore body scroll when menu is closed
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      // Cleanup: restore scroll on unmount
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isMobileNavOpen])

  const closeMobileNav = () => setMobileNavOpen(false)

  return (
    <>
    <main className="home-container">
      <nav className="home-nav" aria-label="Primary">
        <div className="home-nav__links">
          <a href="#about" className="home-nav__link">About me</a>
          <a href="#tech" className="home-nav__link">Tech stacks</a>
          <a href="#projects" className="home-nav__link">Projects</a>
          <a href="#contact" className="home-nav__link">Contact me</a>
        </div>
        <button
          className={`home-nav__hamburger ${isMobileNavOpen ? 'is-open' : ''}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileNavOpen}
          onClick={() => setMobileNavOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        {isMobileNavOpen && (
          <div 
            className="home-nav__backdrop"
            onClick={closeMobileNav}
            aria-hidden="true"
          />
        )}
        <div
          className={`home-nav__drawer ${
            isMobileNavOpen ? 'home-nav__drawer--open' : ''
          }`}
        >
          <button
            className="home-nav__drawer-close"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileNav}
          >
            <span></span>
            <span></span>
          </button>
          <a href="#about" className="home-nav__drawer-link" onClick={closeMobileNav}>
            About me
          </a>
          <a href="#tech" className="home-nav__drawer-link" onClick={closeMobileNav}>
            Tech stacks
          </a>
          <a href="#projects" className="home-nav__drawer-link" onClick={closeMobileNav}>
            Projects
          </a>
          <a href="#contact" className="home-nav__drawer-link" onClick={closeMobileNav}>
            Contact me
          </a>
        </div>
      </nav>
      <div className="home-left">
        <div className="home-title-row">
          <h1 className="home-title">
            <span className="first-name">Shreya</span>
            <br />
            <span className="last-name">Narayani</span>
          </h1>
          <span className="home-title-line" aria-hidden="true" />
        </div>
      </div>
        <div className="home-greeting">
          Hello I am<br />
          <span className="greeting-name">Shreya!</span>
        </div>
        <div className="home-roles">
          <span className="home-roles__label">I am</span>
          <span className="home-roles__text" aria-live="polite">
            {displayedRole}
            <span className="home-roles__cursor" aria-hidden="true" />
          </span>
          <span className="visually-hidden">
            I am {roles[roleIndex]}.
          </span>
      </div>
        <div className="home-social">
          <a href="https://www.linkedin.com/in/shreya-narayani-05a993247/" target="_blank" rel="noopener noreferrer" className="home-social__link" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/Shreyaa6" target="_blank" rel="noopener noreferrer" className="home-social__link" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="home-social__link" aria-label="X (Twitter)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.243 3H21l-6.41 7.332L21 21h-5.936l-3.88-5.18L7.7 21H3.942l6.852-7.829L3.3 3h6.063l3.489 4.741L18.243 3zm-2.09 15.6h1.106L7.918 4.279H6.72l9.433 14.321z"/>
            </svg>
          </a>
          <a href="https://leetcode.com/u/shreyaa_o6/" target="_blank" rel="noopener noreferrer" className="home-social__link" aria-label="LeetCode">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662L2.867 13.988c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.676-4.676c.467-.467 1.111-.702 1.824-.702s1.357.235 1.823.702L16.102 10.7c.467.467.702 1.111.702 1.824s-.235 1.357-.702 1.824l-1.8 1.837zm.799-2.786l2.982-2.982c.392-.392.392-1.023 0-1.414L12.622 4.257c-.392-.392-1.023-.392-1.414 0L4.257 11.336c-.392.392-.392 1.023 0 1.414l7.951 7.951c.392.392 1.023.392 1.414 0l5.277-5.277c.392-.392.392-1.023 0-1.414zm-5.277-5.277l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zm-2.828 2.828l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zm5.656 0l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414z"/>
            </svg>
          </a>
      </div>
      <figure className="home-right">
        <div className="home-arch">
            <img className="home-photo" src={pic} alt="Shreya portrait" />
        </div>
      </figure>
      </main>
      <section id="about" className="about-section">
        <div className="about-section__content">
          <h2 className="about-section__heading">About Me</h2>
          <p>
            I am a Web Developer, Freelancer, and a student at Newton School of Technology, with a strong focus on building efficient, responsive, and visually appealing digital experiences. Skilled in both front-end and back-end development, I specialize in creating complete and seamless web solutions tailored to client needs.
          </p>
          <p>
            Alongside web development, I have a growing interest in robotics, exploring how hardware and software integrate to solve real-world challenges. I'm also passionate about photography, which enhances my creativity and attention to detail. Known for being curious, adaptable, and a fast learner, I'm always eager to explore new technologies and deliver high-quality, impactful digital products.
        </p>
      </div>
      </section>
      <section id="tech" className="tech-section">
        <h2 className="tech-section__heading">Tech Stacks</h2>
        <div className="tech-carousel" ref={carouselRef}>
          <div className="tech-carousel__track">
            {TECH_STACKS.map((tech, index) => (
              <div 
                key={`tech-${index}`}
                className="tech-card"
                ref={(el) => {
                  if (el) cardsRef.current[`tech-${index}`] = el
                }}
              >
                <div className="tech-card__icon">{tech.icon}</div>
                <div className="tech-card__name">{tech.name}</div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {TECH_STACKS.map((tech, index) => (
              <div 
                key={`tech-duplicate-${index}`}
                className="tech-card"
                ref={(el) => {
                  if (el) cardsRef.current[`tech-duplicate-${index}`] = el
                }}
              >
                <div className="tech-card__icon">{tech.icon}</div>
                <div className="tech-card__name">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="projects" className="projects-section" ref={projectsSectionRef}>
        <h2 className="projects-section__heading">Projects</h2>
        <div className="projects-section__line" ref={projectsLineRef}>
          <div 
            className="projects-section__line-dot"
            style={{
              top: `${scrollProgress * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        </div>
        <div className="projects-section__content">
          <div className="project-card">
            <img 
              src={adminImage} 
              alt="Pulse Admin Panel" 
              className="project-card__image"
            />
            <div className="project-card__content">
              <h3 className="project-card__title">Admin Panel</h3>
              <p className="project-card__description">
                The Pulse Admin Panel is a secure web dashboard for managing users, projects, and organizational activities, featuring authentication and role-based access, all deployed on Vercel for reliable cloud access.
              </p>
              <div className="project-card__buttons">
                <a 
                  href={DEFAULT_GITHUB_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-card__button project-card__button--outline"
                >
                  GitHub
                </a>
                <a 
                  href="https://pulse-admin-panel-one.vercel.app/auth" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-card__button"
                >
                  Hosted link
                </a>
              </div>
            </div>
          </div>
          <div className="project-card project-card--right-image">
            <div className="project-card__content">
              <h3 className="project-card__title">_tesseract/</h3>
              <p className="project-card__description">
                _tesseract/ helps teams on GitHub ship higher quality software, faster
              </p>
              <div className="project-card__buttons">
                <a 
                  href={DEFAULT_GITHUB_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-card__button project-card__button--outline"
                >
                  GitHub
                </a>
                <a 
                  href="https://tesseract-indol.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-card__button"
                >
                  Hosted link
                </a>
              </div>
            </div>
            <img 
              src={tesseractImage} 
              alt="_tesseract/" 
              className="project-card__image project-card__image--right"
            />
          </div>
          <div className="project-card">
            <img 
              src={hiraethImage} 
              alt="Hiraeth" 
              className="project-card__image"
            />
            <div className="project-card__content">
              <h3 className="project-card__title">Hiraeth</h3>
              <p className="project-card__description">
                A smart travel planning app that helps users plan trips efficiently from start to finish — from transport and stays to local food, hidden gems, and personalized itineraries. It acts as a personal travel assistant, simplifying travel research and decision-making using AI and smart filters.
              </p>
              <div className="project-card__buttons">
                <a 
                  href={DEFAULT_GITHUB_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-card__button project-card__button--outline"
                >
                  GitHub
                </a>
                <a 
                  href="https://frontend-five-delta-84.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-card__button"
                >
                  Hosted link
                </a>
              </div>
            </div>
          </div>
          <div className="project-card project-card--right-image">
            <div className="project-card__content">
              <h3 className="project-card__title">Dharohar</h3>
              <p className="project-card__description">
                A digital archive showcasing authentic photographs of India’s heritage sites, complete with detailed descriptions, eras, and cultural context. It features a responsive gallery with full-screen viewing, zoom, and mobile-friendly navigation. The platform also includes a community discussion forum, where users can create posts with photos, videos, or text to share experiences, appreciate heritage beauty, or suggest new sites to add.
              </p>
              <div className="project-card__buttons">
                <a 
                  href={DEFAULT_GITHUB_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-card__button project-card__button--outline"
                >
                  GitHub
                </a>
                <a 
                  href="https://example.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-card__button"
                >
                  Hosted link
                </a>
              </div>
            </div>
            <img 
              src={dharoharImage} 
              alt="Dharohar" 
              className="project-card__image project-card__image--right"
            />
          </div>
        </div>
      </section>
      <section id="contact" className="contact-section">
        <div className="contact-section__content">
          <h2 className="contact-section__heading">
            <span className="contact-section__line">LET'S</span>
            <span className="contact-section__line">GET IN</span>
            <span className="contact-section__line">TOUCH</span>
          </h2>
          <div className="contact-section__form-container">
            <form className="contact-form">
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="name" className="contact-form__label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="contact-form__input"
                    required
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="email" className="contact-form__label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="contact-form__input"
                    required
                  />
                </div>
              </div>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="phone" className="contact-form__label">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="contact-form__input"
                    required
                  />
                </div>
              </div>
              <div className="contact-form__message-section">
                <p className="contact-form__prompt">Want to know more? Drop us a line!</p>
                <div className="contact-form__field">
                  <textarea
                    id="message"
                    name="message"
                    className="contact-form__textarea"
                    rows="1"
                    required
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="contact-form__button">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
