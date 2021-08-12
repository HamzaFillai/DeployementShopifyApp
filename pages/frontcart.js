import React from 'react'
import {useState,useEffect,useCallback} from 'react'
import {Button, Card, Layout,Page,FooterHelp,Link, Select,Stack,RadioButton,TextContainer, RangeSlider, Heading , SkeletonDisplayText , SkeletonBodyText,Toast,Frame} from '@shopify/polaris';
import 'animate.css'
import '@shopify/polaris/dist/styles.css';
import Axios from "axios";

function Front() {
    //script tidio
  useEffect(() => {
    const script = document.createElement("script");

  script.src = "//code.tidio.co/x4bgy02m02qwredyxczm2vnt0jnzrh3s.js";
  script.async = true;

  document.body.appendChild(script);
  }, [])
  //script tidio

  var trig = 0;

  //Select Handlers
  const [selected, setSelected] = useState('bounce');

  const handleSelectChange = useCallback((value) =>
  setSelected(value),
  []);
  var classbutton ="btn";

  const options = [
    {label: 'Bounce', value: 'bounce'},
    {label: 'Flash', value: 'flash'},
    {label: 'Pulse', value: 'pulse'},
    {label: 'RubberBand', value: 'rubberBand'},
    {label: 'ShakeX', value: 'shakeX'},
    {label: 'ShakeY', value: 'shakeY'},
    {label: 'HeadShake', value: 'headShake'},
    {label: 'Swing', value: 'swing'},
    {label: 'Tada', value: 'tada'},
    {label: 'Wobble', value: 'wobble'},
    {label: 'Jello', value: 'jello'},
    {label: 'HeartBeat', value: 'heartBeat'},
  ];

  //Select Handlers

  //RadioButton Handlers
    const [value, setValue] = useState('hover');
  
    const handleChange = useCallback(
      (_checked, newValue) => setValue(newValue),
      [],
    );
  //RadioButton Handlers

  //SpeedSlider Handlers
  const [speedValue, setSpeedValue] = useState(5);

  const realValue=speedValue/10+'s'

  const handleSpeedSliderChange = useCallback(
    (value) => setSpeedValue(value),
    [],
  );

//SpeedSlider Handlers

//SaveButtonHandlers
const [active, setActive] = useState(false);
  const toggleActive = ()=>{
    Axios.post("http://localhost:8080/saving",{
      name : selected,
      trigger : trig,
      speed : speedValue/10,
      publish : global.anim,
      shop : global.location.ancestorOrigins[0].split("//",4)[1]
    }).then((response)=>{
      setActive((active) => !active);
    });
  }
  
  const toastMarkup = active ? (
    <Toast content="Save Settings" onDismiss={toggleActive} />
  ) : null;
//SaveButtonHandlers

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

const handleHover=()=>{
  if(value==='hover'){
    animateCSS('.btn', selected);
  }
}

if(value==='always'){
  trig = 1;
  animateCSS('.btn', selected);
  document.getElementById("eltbtn").className = "btn anim animate__animated animate__"+selected;
  window.cookie=document.getElementById("eltbtn").className;
}
else
{
  try{
    
    document.getElementById("eltbtn").className = "btn";
  }catch(err){}
}

  return (
    <div className="App">
     <Frame>
     <Page>
     <Layout>
          <Layout.Section oneThird>
            <Card title="Visual Settings" sectioned>
              <Card.Section>
                <Select
                  label="Animations"
                  options={options}
                  onChange={handleSelectChange}
                  onMouseEnter={()=>console.log("e")}
                  value={selected}
                />
              </Card.Section>
              <Card.Section >
                <Stack vertical alignment="trailling">
                  <Heading>Trigger</Heading>
                  <RadioButton
                    label="Always"
                    checked={value === 'always'}
                    id='always'
                    onChange={handleChange}
                  />
                  <RadioButton
                    label="On hover"
                    checked={value === 'hover'}
                    id='hover'
                    onChange={handleChange}
                  />
                </Stack>
              </Card.Section>
              <Card.Section title="speed of the animation">
                <RangeSlider
                  value={speedValue}
                  onChange={handleSpeedSliderChange}
                  output
                />
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section twoThird>
                <Card title={<Publish />} sectioned actions={[{content: <React.Fragment><Button onClick={toggleActive} primary>Save</Button></React.Fragment>}]}></Card>
                <Card sectioned title="Preview">
                  <TextContainer>
                    <SkeletonDisplayText size="extraLarge" />
                    <div className="alignbtn">
                      <button id="eltbtn" className={classbutton}  style={{animationDuration:realValue }} onMouseEnter={handleHover}><i className="fas fa-shopping-cart fa-flip-horizontal" /> ADD TO CART</button>
                    </div>
                    <SkeletonBodyText lines={1}/>
                    <SkeletonBodyText lines={1}/>
                    <SkeletonBodyText lines={1}/>
                    <br/>
                  </TextContainer>
                </Card>
              </Layout.Section>
          <Layout.Section>
            <FooterHelp>
              Learn more about{' '}
              <Link external url="https://animate.style/">
                Cart Animator
              </Link>
            </FooterHelp>
          </Layout.Section>
          {toastMarkup}
      </Layout>
     </Page>
     </Frame>
    </div>
  );
}

function Publish() {
    
  const myToggel = ()=>{
          if(document.getElementById("pub").innerHTML==="Unpublished")
          {
              document.getElementById("pub").innerHTML="Published"
              window.anim = "published"
          }
          else
          {
              document.getElementById("pub").innerHTML="Unpublished"
              window.anim = "unpublished"
          }
  }

  return (
      <div>
          <div className="component2">
              <div className="dis">
                  <div className="published">
                  <label className="switch">
                      <input onClick={myToggel} type="checkbox" />
                      <span className="slider round"></span>
                  </label>
                  <p id="pub">Unpublished</p>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Front
