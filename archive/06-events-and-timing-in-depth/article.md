
# Sync and async events

JavaScript is a single-threaded language: only one script may execute at a given moment of time.

Other activities like rendering, downloading etc may be managed by separate threads. For instance, JavaScript may execute while the browser is downloading a file, that's normal. But it is impossible that two event handlers or two `setTimeout`-scheduled function execute simultaneously.

There is a [Web Workers](http://www.w3.org/TR/workers) standard which defines the support for multiple JavaScript *workers* -- subprocesses that may execute in parallel with the main code, but their abilities are limited. In the browser workers don't have access to DOM, so again we come to a single "main" JavaScript thread.

## Asynchronous events   

Most events are asynchronous.

When an asynchronous event occurs, it gets into the *Event queue*.

The browser has inner loop, called *Event Loop*, which checks the queue and processes events, executes functions etc.

For example, if the browser is busy processing your `onclick`, and another event happens in the background, it is appended to the queue. When the `onclick` handler is complete, the queue is checked and the script is executed.

Calls scheduled by `setTimeout/setInterval` are also passed through the event queue, so that they wait until the JavaScript engine gets free.


## Synchronous events   

There are events which don't use the event queue. They are called *synchronous events* and work immediately even when inside other handlers.</b>


### DOM mutation events are synchronous.   

In the example below, the `onclick` handler changes an attribute of the link, which has a `DOMAttrModified(onpropertychange for IE)` listener.

[summary]
Synchronous mutation events are processed immediately during `onclick`.
[/summary]

Click the link to see:
[html autorun height=auto]
<a href="#">Click me!</a>

<script>
let a = document.body.children[0]

a.onclick = function() {
  alert('in onlick')
  this.setAttribute('href', 'lala')
  alert('out onclick')
  return false
}

function onpropchange() {
  alert('onpropchange')
}

if (a.addEventListener) { // FF, Opera
  a.addEventListener('DOMAttrModified', onpropchange, false)
}
if (a.attachEvent) { // IE
  a.attachEvent('onpropertychange', onpropchange)
}
</script>
[/html]

The `click` processing order:
<ol>
<li>`alert('in onclick')` works.</li>
<li>The attribute is changed and the DOM mutation event is processed synchronously, immediately triggering `onchange`. It outputs `alert('onpropchange')`.</li>
<li>The rest of `onclick` executes, leading to `alert('out onclick')`.</li>
</ol>


### Nested DOM events are synchronous.   

[summary]
There are methods which trigger an immediate event, like `elem.focus()`. These events are also processed in a synchronous manner.
[/summary]

Run the example below and click on the button. Notice that `onfocus`
doesn't wait `onclick` to complete, it works immediately.

[html autorun height=auto]
<input type="button" value="click me">
<input type="text">

<script>
  let button = document.body.children[0]
  let text = document.body.children[1]

  button.onclick = function() {
    alert('in onclick')

    text.focus()

    alert('out onclick')
  }

  text.onfocus = function() {
    alert('onfocus')
    text.onfocus = null  //(*)
  }
</script>
[/html]

In the example above, the alert order is in <code>onclick-&gt;focus-&gt;out onclick</code>, that clearly demonstrates the synchronous behavior.

[smart]
The line labelled (*) is required, because `alert(message)` focuses on the message window. When it is disposed, the browser refocuses back.

So without (*) the `focus` would be triggered one extra time after the alert.
[/smart]

[summary]
Events are also processed immediately when triggered from JavaScript by `dispatchEvent/fireEvent`.
[/summary]

Usually event handlers are executed one by one. So we assume that one handler finishes before the other starts.

**Synchronous events break this one-by-one rule, that may can cause side-effects.**

For example, the `onfocus` handler may assume that `onclick` has completed the job.

There are two ways to fix it:
<ol>
<li>Move `text.focus()` to the end of the `onclick` code.</li>
<li>Wrap `text.focus()` into `setTimeout(.., 0)`:
[js]
button.onclick = function() {
  alert(1)
  setTimeout(function() { text.focus() }, 0)
  alert(2)
}
[/js]
</li>
</ol>

The concrete way is chosen according to your architecture.


## JavaScript execution and rendering   

[summary]In most browsers, rendering and JavaScript use single event queue. It means that while JavaScript is running, no rendering occurs.[/summary]

Check it on the demo below. **When you press `run`, the browser may halt for some time**, because it changes `div.style.backgroundColor` from #A00000 to #FFFFFF.

In most browsers, you see nothing until the script finishes, or until the browser pauses it with a message that 'a script is running too long'.

The exception is Opera.

[html run]
<div style="width:200px;height:50px;background-color:#A00000"></div>

<input type="button" onclick="run()" value="run()">

<script>
function run() {
  let div = document.getElementsByTagName('div')[0]
  for(let i=0xA00000;i<0xFFFFFF;i++) {
    div.style.backgroundColor = '#'+i.toString(16)
  }
}
</script>
[/html]

In Opera, you may notice `div` is redrawn. Not every change causes a repaint, probably because of Opera internal scheduling. That's because event queues for rendering and JavaScript are different in this browser.

In other browsers the repaint is postponed until the JavaScript finishes.

Again, the implementation may be different, but generally **the nodes are marked as "dirty" (want to be recalculated and redrawn), and repaint is queued**. Or, the browser may just look for dirty nodes after every script and process them.

[smart header="Immediate reflow"]
The browser contains many optimizations to speedup rendering and painting. Generally, it tries to postpone them until the script is finished, but some actions require nodes to be rerendered immediately.

For example:
[js]
elem.innerHTML = 'new content'
alert(elem.offsetHeight)  // <-- rerenders elem to get offsetHeight
[/js]

In the case above, the browser has to perform relayouting to get the height.
But it doesn't have to repaint `elem` on the screen.

Sometimes other dependant nodes may get involved into calculations. This process is called *reflow* and may consume lots of resources if script causes it often.

Surely, there's much more to talk about rendering. It will be covered by a separate article [todo].
[/smart]


## Modal and synchronous calls   

[summary]Modal and synchronous calls like `alert` pause the JavaScript thread.

That causes related activities to freeze.
[/summary]

The example below demonstrates it.

<ol>
<li>Press "Run". The `setInterval`-based animation will start and and `alert` button will appear.</li>
<li>Press the button, note that the animation stops.</li>
</ol>

<input type="button" onclick="alert('Hello!')" value="alert('Hello!')  [ main window ]">
[html run height=60]
<div style="height:20px;width:0px;background-color:green"></div>
<script>
let timer = setInterval(function() {
  let style = document.getElementsByTagName('div')[0].style
  style.width = (parseInt(style.width)+2)%400 + 'px'
}, 30)

</script>
<input type="button" onclick="alert('Hello!')" value="alert('Hello!')  [ iframe ]">
<input type="button" onclick="clearInterval(timer)" value="clearInterval(timer)">
[/html]

When you press `alert('Hello!')`, the `alert` blocks JavaScript execution and blocks the whole UI thread. That's how `alert`, `confirm` and `prompt` work. And there is only one thread. So, **`setTimeout/setInterval` can't execute while the thread is blocked.**


### Opera: `iframes` exception.   

[summary]Usually, `iframes` run in the same thread with the page. [/summary]

But there is an exception called Opera. **Run the example above in Opera** and press alert in the <u>main window</u>. The iframe animation will continue!
That's because the example is actually running in an iframe.

Other browsers use single thread for whole tab, so the iframe animation is paused there.



## Script taking too long and heavy jobs   

JavaScript can be heavy.

In this case, the browser may hangup for a moment or come with a warning "Script is taking too long".

We'd want to evade that. It can be done by split the job into parts which get scheduled after each other.

Then there is a "free time" for the browser to respond between parts. It is can render and react on other events. Both the visitor and the browser are happy.

The background color in the example below is changed once per tick. So the browser has the time to render it, and there are no hangups. Changes are applied incrementally.

Press the run button on the example to start.
[html run]
<div style="width:200px;height:50px;background-color:#100"></div>

<input type="button" onclick="run()" value="run()">
<input type="button" onclick="stop()" value="stop()">

<script>
let timer

function run() {
  let div = document.getElementsByTagName('div')[0]
  let i=0x100000

  function func() {
    timer = setTimeout(func, 0)
    div.style.backgroundColor = '#'+i.toString(16)
    if (i++ == 0xFFFFFF) stop()
  }

*!*
  timer = setTimeout(func, 0)
*/!*
}

function stop() {
  clearInterval(timer)
}
</script>
[/html]

The internal order:
<ol>
<li>`setTimeout` appends the `func` call to the event queue.</li>
<li>The new call is scheduled on the next tick.</li>
<li>The func executes and changes the `div` which appends a repaint request to the queue.</li>
<li>The function finishes. The browser takes the next event from the queue which is repaint and executes it. Then it waits the next tick to execute one more `func` call (see step 2).</li>
<li>Repeated until `stop()`</li>
</ol>

A delay may be increased from 0 to 100 ms, depending on your needs. The longer delay leads to less CPU load.

[smart header="Evade the 'script is running for too long' warning"]
As an important side-effect, splitting the long job into parts which are executed by `setTimeout` helps to fix browser hangups and evade warnings.

For example, modern syntax highlighters employ such technique. When a visitor opens a large text, they highlight a part of it then call something like `setTimeout(highlightNext, 50)` which highlights the next part etc.

It would hangup otherwise, because the syntax highlighting takes time.
[/smart]



## Summary   

Most browsers use single thread for UI and JavaScript, which is blocked by synchronous calls. So, JavaScript execution blocks the rendering.

Events are processed asynchronously with the exception of DOM events.

The `setTimeout(..,0)` trick is very useful. It allows to:
<ul>
<li>Let the browser render current changes.</li>
<li>Evade the "script is running too long" warning.</li>
<li>Change the execution flow.</li>
</ul>

Opera is special in many places when it comes to timeouts and threading.
