# Mint Shelf motion

The mark may move during transitions, but it always resolves to the canonical
still geometry in [`assets/marks/mark-green.svg`](assets/marks/mark-green.svg).
Motion is an expression of gathering and organization, not a separate mark.

## Orbit and settle

The preferred entrance begins with the four leaves distributed around a broad
clockwise orbit. Each leaf follows a curved path toward its final position while
rotating independently. All rotation stops when the mark assembles; the finished
mark does not spin.

- Assembly: 1,500 ms
- Leaf rotation during assembly: 1.5 turns counterclockwise to rest
- Easing: expressive deceleration, approximately `cubic-bezier(.22, 1, .36, 1)`
- Hold before a transition: at least 400 ms
- Optional surface fade: 500 ms
- Stagger: none by default; the four leaves behave as one coordinated system

[`assets/motion/orbit-settle.svg`](assets/motion/orbit-settle.svg) is a looping
reference, not a production delivery. Consumer implementations must use native
motion primitives, preserve the final geometry, and stop cleanly rather than
looping when the entrance completes.

## Reduced motion

When reduced motion is requested, show the complete still mark immediately and
use only an opacity transition of 200 ms or less. Do not substitute pulsing,
scaling, orbiting, or repeated movement.

## Other motion

A short sequential opacity pulse around the four leaves may communicate an
indeterminate handoff when a standard progress indicator is inappropriate. It
must not be the only indication of loading, and it must stop after the state
changes. Do not morph the leaves, rotate the assembled mark, or animate the mark
continuously as decoration.
