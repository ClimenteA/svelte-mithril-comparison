

// https://svelte.dev/tutorial/adding-data

/*
<script>
	let name = 'world';
</script>

<h1>Hello {name.toUpperCase()}!</h1>
*/


const HelloWorld = {
  view: ({attrs}) => m("h1", "Hello" + attrs.name.toUpperCase())
}

m.render(
  document.getElementById("adding-data"),
  m(HelloWorld, {name: "world"})
)


// https://svelte.dev/tutorial/dynamic-attributes

/*

<script>
	let src = 'tutorial/image.gif';
	let name = 'Rick Astley';
</script>

<img {src} alt="{name} dances.">

*/


const DynamicAttrs = {
  view: ({attrs}) => m("img", {src:attrs.src}, attrs.name)
}


m.render(
  document.getElementById("dynamic-attributes"),
  m(DynamicAttrs, {src:"https://svelte.dev/tutorial/image.gif", name: "Rick Astley"})
)




// https://svelte.dev/tutorial/styling

/*

<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<p>This is a paragraph.</p>

*/


const style_scoped = {
  "color": "purple",
  "font-family": "'Comic Sans MS', 'cursive'",
  "font-size": "2em"
}


const StyledComponent = {
  view: v => m("p", {style:style_scoped}, "This is a paragraph.")
}


m.render(
  document.getElementById("styling"),
  m(StyledComponent)
)


// https://svelte.dev/tutorial/nested-components

/*

./Nested.svelte 
<p>This is another paragraph.</p>

./App.svelte

<script>
	import Nested from './Nested.svelte';
</script>

<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<p>This is a paragraph.</p>
<Nested/>

*/


// Nested.js
const Nested = {
  view: v => m("p", "This is another paragraph.") 
}

// export default Nested

// App.js
// import Nested from './Nested.js'

const another_style_scoped = {
  "color": "purple",
  "font-family": "'Comic Sans MS', 'cursive'",
  "font-size": "2em"
}


const MainComponent = {
  view: v => [
    m("p", {style:another_style_scoped}, "This is a paragraph."),
    m(Nested)
  ]
}


m.render(
  document.getElementById("nested-components"),
  m(MainComponent)
)


// https://svelte.dev/tutorial/html-tags

/*

<script>
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>

*/


const string = `this string contains some <strong>HTML!!!</strong>`

const RawHtml = {
  view: ({attrs}) => m("p", m.trust(attrs.string))
}

m.render(
  document.getElementById("html-tags"),
  m(RawHtml, {string})
)


// https://svelte.dev/tutorial/reactive-assignments

/*

<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

*/


function Button(){

  let count = 0;

	function handleClick() {
		count += 1
	}

  return {
    view: v => m("button", 
                {onclick:handleClick}, 
                `Clicked ${count} ${count === 1 ? 'time' : 'times'}`)
  }
}


m.mount(
  document.getElementById("reactive-assignments"),
  Button()
)


// https://svelte.dev/tutorial/reactive-declarations

/*

<script>
	let count = 0;
	$: doubled = count * 2;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>


*/



const state = {
  count: 0,
  doubled: 0
} 


const ButtonReactive = () => {

	function handleClick() {
    state.count = state.count += 1
    state.doubled = state.count * 2
	}

  return {
    view: v => m("button", 
                {onclick:handleClick}, 
                `Clicked ${state.count} ${state.count === 1 ? 'time' : 'times'}`)
  }
}


const Keeptrack = {
  view: v => m("p", `${state.count} doubled is ${state.doubled}`)
} 


m.mount(
  document.getElementById("reactive-declarations"),
  {view: v => [
    m(ButtonReactive()),
    m(Keeptrack)
  ]}
)



// https://svelte.dev/tutorial/reactive-statements

/*

<script>
	let count = 0;

	$: if (count >= 10) {
		alert(`count is dangerously high!`);
		count = 9;
	}

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>


*/



const store = {
  count: 0,
  doubled: 0
} 


const ButtonStatements = () => {

  if (store.count >= 10) {
		alert(`count is dangerously high!`)
		store.count = 9
	}

	function handleClick() {
    store.count = store.count += 1
    store.doubled = store.count * 2
	}

  return {
    view: v => m("button", 
                {onclick:handleClick}, 
                `Clicked ${store.count} ${store.count === 1 ? 'time' : 'times'}`)
  }
}


const TrackStatements = {
  view: v => m("p", `${store.count} doubled is ${store.doubled}`)
} 


m.mount(
  document.getElementById("reactive-statements"),
  {view: v => [
    m(ButtonStatements()),
    m(TrackStatements)
  ]}
)



// https://svelte.dev/tutorial/updating-arrays-and-objects

/*

<script>
	let numbers = [1, 2, 3, 4];

	function addNumber() {
		numbers = [...numbers, numbers.length + 1];
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
	Add a number
</button>


*/


let numbers = [1, 2, 3, 4]

let sum

function makeSum(){
  sum = numbers.reduce((t, n) => t + n, 0)
  return sum
}
  
sum = makeSum()

const JoinedNumbers = {
  view: v => m("p", `${numbers.join(' + ')} = ${sum}`)
}

const ButtonAddNumber = () => {

  function addNumber() {
    numbers = [...numbers, numbers.length + 1]
    makeSum()
	}

  return {
    view: v => m("button", {onclick:addNumber}, "Add a number")
  }
}


m.mount(
  document.getElementById("updating-arrays-and-objects"),
  {view: v => [
    m(JoinedNumbers),
    m(ButtonAddNumber())
  ]}
)



// https://svelte.dev/tutorial/declaring-props

/*

./Nested.svelte

<script>
	export let answer;
</script>

<p>The answer is {answer}</p>

./App.svelte

<script>
	import Nested from './Nested.svelte';
</script>

<Nested answer={42}/>

*/


// ./Nested.js
const NestedAnswer = {
  view: ({attrs}) => m("p", `The answer is ${attrs.answer}`)
}
// export default NestedAnswer


// ./App.js
// import NestedAnswer from './Nested.js'


m.render(
  document.getElementById("declaring-props"),
  m(NestedAnswer, {answer:42})
)

// render for static components, mount is for reactive components
// m.mount(
//   document.getElementById("declaring-props"),
//   {view: () => m(NestedAnswer, {answer:42})}
// )



// https://svelte.dev/tutorial/default-values

/*

./Nested.svelte

<script>
	export let answer = 'a mystery';
</script>

<p>The answer is {answer}</p>


./App.svelte

<script>
	import Nested from './Nested.svelte';
</script>

<Nested answer={42}/>
<Nested/>


*/


// ./Nested.js
const NestedAnswerDefault = {
  view: ({attrs}) => [
     m("p", `The answer is ${attrs.answer ? attrs.answer :  'a mystery'}`)
  ]
}
// export default NestedAnswerDefault


// ./App.js
// import NestedAnswerDefault from './Nested.js'

m.mount(
  document.getElementById("default-values"),
  {view: v => [
    m(NestedAnswerDefault, {answer:42}),
    m(NestedAnswerDefault)
  ]}  
)




// https://svelte.dev/tutorial/spread-props

/*

./Info.svelte
<script>
	export let name;
	export let version;
	export let speed;
	export let website;
</script>

<p>
	The <code>{name}</code> package is {speed} fast.
	Download version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>
	and <a href={website}>learn more here</a>
</p>

./App.svelte

<script>
	import Info from './Info.svelte';

	const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	};
</script>

<Info {...pkg}/>

*/

// Info.js
const Info = {
  view: ({attrs}) => m("p", m.trust(`The <code>${attrs.name}</code> package is ${attrs.speed} fast.
	Download version ${attrs.version} from <a href="https://www.npmjs.com/package/${attrs.name}">npm</a>
	and <a href=${attrs.website}>learn more here</a>`))
}


// App.js
// import Info from './Info.js'

const pkg = {
  name: 'mithril',
  version: 2,
  speed: 'blazing',
  website: 'https://mithril.js.org/'
}


m.render(
  document.getElementById("spread-props"),
  m(Info, {...pkg})
)


// https://svelte.dev/tutorial/if-blocks

/*
<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}>
		Log in
	</button>
{/if}

*/


const ButtonLogIn = () => {
  
  let user = { loggedIn: false }

  function toggle() {
    user.loggedIn = !user.loggedIn
  }

  return {
    view: v => m("button", 
          {onclick:toggle}, 
          user.loggedIn ? "Log out" : "Log in")
  }
}


m.mount(
  document.getElementById("if-blocks"),
  ButtonLogIn()
)


// https://svelte.dev/tutorial/else-blocks

/*

<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}

*/


// ..Same as up




// https://svelte.dev/tutorial/else-if-blocks

/*

<script>
	let x = 7;
</script>

{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}

*/


const Greater = () => {

  let x = 7

  return {
    view: v => {

      if (x > 10) {
        return m("p", `${x} is greater than 10`)
      } 
      else if (5 > x) {
        return m("p", `${x} is less than 5`)
      }
      else {
        return m("p", `${x} is between 5 and 10`)
      }
    }
       
  }
}


m.mount(
  document.getElementById("else-if-blocks"),
  Greater()
)


// https://svelte.dev/tutorial/each-blocks

/*

<script>
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
	{#each cats as { id, name }, i}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={id}">
			{i + 1}: {name}
		</a></li>
	{/each}
</ul>

*/


const CatList = () => {


  let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	]

  return {
    view: v => {
      return [
        m("h1", "The Famous Cats of YouTube"),
        m("ul", 
          cats.map(({name, id}, i) => {
            return m("li", 
              m("a", { 
                target:"_blank", 
                href:`https://www.youtube.com/watch?v=${id}` 
              }, 
              `${i + 1}: ${name}` ))
          })
      )]
    }
  }

}
  

m.mount(
  document.getElementById("each-blocks"),
  CatList()
)




// https://svelte.dev/tutorial/keyed-each-blocks

/*

// Thing.svelte

<script>
	// `current` is updated whenever the prop value changes...
	export let current;

	// ...but `initial` is fixed upon initialisation
	const initial = current;
</script>

<p>
	<span style="background-color: {initial}">initial</span>
	<span style="background-color: {current}">current</span>
</p>

<style>
	span {
		display: inline-block;
		padding: 0.2em 0.5em;
		margin: 0 0.2em 0.2em 0;
		width: 4em;
		text-align: center;
		border-radius: 0.2em;
		color: white;
	}
</style>


// App.svelte

<script>

	import Thing from './Thing.svelte';

	let things = [
		{ id: 1, color: '#0d0887' },
		{ id: 2, color: '#6a00a8' },
		{ id: 3, color: '#b12a90' },
		{ id: 4, color: '#e16462' },
		{ id: 5, color: '#fca636' }
	];

	function handleClick() {
		things = things.slice(1);
	}
</script>

<button on:click={handleClick}>
	Remove first thing
</button>

{#each things as thing (thing.id)}
	<Thing current={thing.color}/>
{/each}

*/

// Thing.js

const span_style = {
  "display": "inline-block",
  "padding": "0.2em 0.5em",
  "margin": "0 0.2em 0.2em 0",
  "width": "4em",
  "text-align": "center",
  "border-radius": "0.2em",
  "color": "white"
}


const Thing = {

  oninit: v => {
    v.attrs.initial = v.attrs.current
  },

  view: ({attrs}) => {

    let initial_style = Object.assign(span_style, {"background-color": attrs.initial})
    let current_style = Object.assign(span_style, {"background-color": attrs.current})

    return m("p", [    

      m("span", {style:initial_style}, "initial"),      
      m("span", {style:current_style}, "current")

    ])
  }

}

// export default Thing


// App.js
// import Thing from './Thing.js'

const SpanThings =  () => {

	let things = [
		{ id: 1, color: '#0d0887' },
		{ id: 2, color: '#6a00a8' },
		{ id: 3, color: '#b12a90' },
		{ id: 4, color: '#e16462' },
		{ id: 5, color: '#fca636' }
	]

	function handleClick() {
		things = things.slice(1)
	}

  return {
    view: v => [
      
      m("button", {onclick:handleClick}, "Remove first thing"),
      
      things.map((thing) => {
        return m(Thing, {current:thing.color, key:thing.id})
      })

    ]
    
  }
}


m.mount(
  document.getElementById("keyed-each-blocks"),
  SpanThings()
)



// https://svelte.dev/tutorial/await-blocks

/*


<script>
	let promise = getRandomNumber();

	async function getRandomNumber() {
		const res = await fetch(`tutorial/random-number`);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	function handleClick() {
		promise = getRandomNumber();
	}
</script>

<button on:click={handleClick}>
	generate random number
</button>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


*/



const WaitComponent = () => {

  let number = undefined
  let error = false

  m.request({
      method: "GET",
      url: "https://svelte.dev/tutorial/random-number"
  })
  .then(res => {
      number = res
  })
  .catch(res => {
    error = true
  })
 
  return {
    view: v => {

      if (number && !error) {
        return m("p", `The number is ${number}`)
      }
      else if (number === undefined && !error) {
        return m("p", "...waiting")
      }
      else if (error) {
        return m("p", {style:{color: "red"}}, "Number not fetched. Please try again.")
      }

    }

  }
}


m.mount(
  document.getElementById("await-blocks"),
  WaitComponent()
)



// https://svelte.dev/tutorial/dom-events


/*


<script>
	let m = { x: 0, y: 0 };

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<style>
	div { width: 100%; height: 100%; }
</style>

<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>

*/


const CursorTrak = () => {

  let mpos = { x: 0, y: 0 }

	function handleMousemove(event) {
		mpos.x = event.clientX
		mpos.y = event.clientY
	}

  return {
    view: v => m("div", 
      { 
        onmousemove:ev => handleMousemove(ev), 
        style:"width: 100%; height: 400px; border: 1px solid black"
      }, 
      `The mouse position is ${mpos.x} x ${mpos.y}`)
  }
}


m.mount(
  document.getElementById("dom-events"),
  CursorTrak()
)


// https://svelte.dev/tutorial/event-modifiers

/*

<script>
	function handleClick() {
		alert('no more alerts')
	}
</script>

<button on:click|once={handleClick}>
	Click me
</button>


*/


// By default handleClick will be passed an event as a param
// onclick:handleClick < event will be available in closure function handleClick(event)
// From there you can handle event modifiers in vannila js


const OnceComponent = () => {

  let once = true

  function handleClick() {
    if (once) {
      alert('no more alerts')
      once = false
    }
  }
  
  return {
    view: v => m("button", {onclick:handleClick}, "Click me")
  }
}



m.mount(
  document.getElementById("event-modifiers"),
  OnceComponent()
)




// https://svelte.dev/tutorial/component-events


/*

// Inner.svelte

<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>

<button on:click={sayHello}>
	Click to say hello
</button>


// App.svelte

<script>
	import Inner from './Inner.svelte';

	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>

<Inner on:message={handleMessage}/>

*/


// Inner.js
const Inner = () => {

  function sayHello(event) {
		alert("Hello!")
  }
  
  return {
    view: v => m("button", {onclick:sayHello}, "Click to say hello")
  }
  
}


// App.js
// import Inner from './Inner.js'
// Can be done but in vannila js: https://javascript.info/dispatch-events

m.mount(
  document.getElementById("event-modifiers"),
  Inner()
)



// https://svelte.dev/tutorial/event-forwarding


/*

// Outer.svelte

<script>
	import Inner from './Inner.svelte';
</script>

<Inner on:message/>



// Inner.svelte

<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>

<button on:click={sayHello}>
	Click to say hello
</button>


// App.svelte

<script>
	import Outer from './Outer.svelte';

	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>

<Outer on:message={handleMessage}/>

*/


// event-forwarding todo



// https://svelte.dev/tutorial/dom-event-forwarding


/*

// CustomButton.svelte

<style>
	button {
		height: 4rem;
		width: 8rem;
		background-color: #aaa;
		border-color: #f1c40f;
		color: #f1c40f;
		font-size: 1.25rem;
		background-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);
		background-position: 100%;
		background-size: 400%;
		transition: background 300ms ease-in-out;
	}
	button:hover {
		background-position: 0;
		color: #aaa;
	}
</style>

<button on:click>
	Click me
</button>



// App.svelte

<script>
	import CustomButton from './CustomButton.svelte';

	function handleClick() {
		alert('clicked');
	}
</script>

<CustomButton on:click={handleClick}/>


*/


// dom-event-forwarding TODO



// https://svelte.dev/tutorial/text-inputs

/*

<script>
	let name = 'world';
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>

*/

const Bindings = () => {

  let name = 'world'

  return {
    view: v => [
      m("h1", `Hello ${name}!`),
      m("input", {oninput:event => {name=event.target.value}, value:name})
    ]
    
  }
}


m.mount(
  document.getElementById("text-inputs"),
  Bindings()
)


// https://svelte.dev/tutorial/numeric-inputs

/*

<script>
	let a = 1;
	let b = 2;
</script>

<label>
	<input type=number bind:value={a} min=0 max=10>
	<input type=range bind:value={a} min=0 max=10>
</label>

<label>
	<input type=number bind:value={b} min=0 max=10>
	<input type=range bind:value={b} min=0 max=10>
</label>

<p>{a} + {b} = {a + b}</p>

*/


const NumericBindings = () => {
  
  let a = 1
  let b = 2
  
  function bind_a(event){
    a = Number(event.target.value)
  }

  function bind_b(event){
    b = Number(event.target.value)
  }

  return {
    view: v => [

      m("label", [
        m("input", {type:"number", value:a, min:0, max:10, oninput:bind_a}, a),
        m("input", {type:"range", value:a, min:0, max:10, oninput:bind_a}, a)
      ]),

      m("label", [
        m("input", {type:"number", value:b, min:0, max:10, oninput:bind_b}, b),
        m("input", {type:"range", value:b, min:0, max:10, oninput:bind_b}, b)
      ]),

      m("p", `${a} + ${b} = ${a + b}`)

    ]
    
  }
}


m.mount(
  document.getElementById("numeric-inputs"),
  NumericBindings()
)


// https://svelte.dev/tutorial/checkbox-inputs

/*

<script>
	let yes = false;
</script>

<label>
	<input type=checkbox bind:checked={yes}>
	Yes! Send me regular email spam
</label>

{#if yes}
	<p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
	<p>You must opt in to continue. If you're not paying, you're the product.</p>
{/if}

<button disabled={!yes}>
	Subscribe
</button>


*/


const Checkbox = () => {

  let yes = false

  return {
    view: v => [

      m("label", [
        m("input", {type:"checkbox", onchange:() => yes = !yes }),
        m("span", "Yes! Send me regular email spam")
      ]),

      yes   
      ? m("p", "Thank you. We will bombard your inbox and sell your personal details.") 
      : m("p", "You must opt in to continue. If you're not paying, you're the product."),

      m("button", {disabled:!yes}, "Subscribe")
    ]
  }
}



m.mount(
  document.getElementById("checkbox-inputs"),
  Checkbox()
)




// https://svelte.dev/tutorial/group-inputs

/*

<script>
	let scoops = 1;
	let flavours = ['Mint choc chip'];

	let menu = [
		'Cookies and cream',
		'Mint choc chip',
		'Raspberry ripple'
	];

	function join(flavours) {
		if (flavours.length === 1) return flavours[0];
		return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
	}
</script>

<h2>Size</h2>

<label>
	<input type=radio bind:group={scoops} value={1}>
	One scoop
</label>

<label>
	<input type=radio bind:group={scoops} value={2}>
	Two scoops
</label>

<label>
	<input type=radio bind:group={scoops} value={3}>
	Three scoops
</label>

<h2>Flavours</h2>

{#each menu as flavour}
	<label>
		<input type=checkbox bind:group={flavours} value={flavour}>
		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {join(flavours)}
	</p>
{/if}


*/



let scoops = 1
let flavours = ['Mint choc chip']

let menu = [
  'Cookies and cream',
  'Mint choc chip',
  'Raspberry ripple'
]


function join(flavours) {
  if (flavours.length === 1) return flavours[0]
  return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`
}


function bind_scoops(event){
  scoops = event.target.value
}

function bind_flavour(event){
  flavours.push(event.target.value)
}


const ScoopSize = {

  view: ({attrs}) => [      
    
    m("h2", "Size"),

    m("label", [
      m("input", {type:"radio", value:1, name:"scoops", onchange:bind_scoops}),
      m("span", "One scoop")
    ]),
      
    m("label", [
      m("input", {type:"radio", value:2, name:"scoops", onchange:bind_scoops}),
      m("span", "Two scoops")
    ]),
      
    m("label", [
      m("input", {type:"radio", value:3, name:"scoops", onchange:bind_scoops}),
      m("span", "Three scoops")
    ]),
  ]

}


const Flavours = {
  view: ({ attrs }) => [
    m("h2", "Flavours"),
    menu.map(flavour => {
      return m("label", [
        m("input", {type:"checkbox", value:flavour, name:flavour, onchange:bind_flavour}),
        m("span", flavour)
      ])
    })

  ]
}


const Order = {
  view: ({ attrs }) => {

    if (flavours.length === 0){
      return m("p", "Please select at least one flavour")
    }
    else if (flavours.length > scoops) {
      return m("p", "Can't order more flavours than scoops!")
    }
    else {
      return m("p", 
      `You ordered ${scoops} ${scoops === 1 ? 'scoop' : 'scoops'} of ${join(flavours)}`)
    }
  }
}


const GroupedCk = () => {

  return {
    view: v => [
      m(ScoopSize),
      m(Flavours),
      m(Order)
    ]
  }
}



m.mount(
  document.getElementById("group-inputs"),
  GroupedCk()
)








































