
The solution uses `count` in the local variable, but addition methods are written right into the `counter`. They share the same outer Environment Record and also can access the current `count`.
