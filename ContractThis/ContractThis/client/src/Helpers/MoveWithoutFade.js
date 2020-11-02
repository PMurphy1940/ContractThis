import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const MoveWithoutFade = ({
  children,
  wrapperElement = "div",
  direction = null,
  delay = 0,
  ...props
}) => {
  const Component = wrapperElement;
  let compRef = useRef(null);
  const distance = 200;
  let fadeDirection;
  switch (direction) {
    case "left":
      fadeDirection = { x: -props.distance };
      break;
    case "right":
      fadeDirection = { x: props.distance };
      break;
    case "up":
      delay=1
      fadeDirection = { y: props.distance };
      break;
    case "down":
      fadeDirection = { y: -distance };
      break;
    default:
      fadeDirection = { x: 0 };
  }
  useEffect(() => {
    gsap.from(compRef.current, 1, {
      ...fadeDirection,
      opacity: 1,
      delay
    });
  }, []);
  return (
    <Component ref={compRef} {...props}>
      {children}
    </Component>
  );
};

export default MoveWithoutFade;