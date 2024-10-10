import React, { createRef, useLayoutEffect, useState } from "react";
import styles from "./Dial.module.scss";

type DialProps = {
  width: number;
  strokeWidth: number;
  percent: number;
};
export const Dial = ({ width, strokeWidth, percent}: DialProps) => {
  const [value, setValue] = useState<number>(percent);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [circumference, setCircumference] = useState<number>();
  const [strokeOffset, setStrokeOffset] = useState<number>(0);

  const circleRef = createRef<SVGCircleElement>();

  const radius = width / 2 - strokeWidth * 2;

  useLayoutEffect(() => {
    if (circleRef && circleRef.current) {
      const rad = circleRef.current.r.baseVal.value; // calculated radius
      const circ = rad * 2 * Math.PI; // calculated circumference
      setCircumference(circ);
      setStrokeOffset(circ - (value / 100) * circ); // marks the progress on the circle
    }
  }, [circleRef, percent , value]);

  return (
    <div
      className={styles.dial}
      style={{ cursor: mouseOver ? "pointer" : "", width: `${width}px` }}
      onMouseEnter={() => {
        setValue(0);
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setValue(percent);
        setMouseOver(false);
      }}
    >
      <svg className={styles.dial} height={width} width={width}>
        <circle
          ref={circleRef}
          className={styles.full}
          fill="transparent"
          r={radius}
          cx={width / 2}
          cy={width / 2}
        />
        <circle
          ref={circleRef}
          className={styles.progress}
          style={{
            strokeWidth: 4,
            stroke: "white",
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: `${strokeOffset}`,
          }}
          fill="transparent"
          r={radius}
          cx={width / 2}
          cy={width / 2}
        />
      </svg>
      <div className={styles.value}>{`${percent}`}</div>
    </div>
  );
};
