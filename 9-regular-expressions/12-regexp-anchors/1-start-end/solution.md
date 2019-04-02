
The empty string is the only match: it starts and immediately finishes.

The task once again demonstrates that anchors are not characters, but tests.

The string is empty `""`. The engine first matches the `pattern:^` (input start), yes it's there, and then immediately the end `pattern:$`, it's here too. So there's a match.
