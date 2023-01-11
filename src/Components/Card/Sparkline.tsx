import { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { SparkTypes } from "./types";

const Container = styled.div`
  padding: 20px 0px;
  margin-top: auto;
`;

const Sparkline = ({ sparkData, sparkColor, width, height }: SparkTypes): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawSparkline = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale the data to fit the canvas
    const maxValue = Math.max(...sparkData);
    const minValue = Math.min(...sparkData);
    const yScale = canvas.height / (maxValue - minValue);
    const xScale = canvas.width / (sparkData.length - 1);

    // Begin a new path
    ctx.beginPath();
    ctx.moveTo(0, (sparkData[0] - minValue) * yScale);
    ctx.strokeStyle = sparkColor;

    // Draw lines to each point
    sparkData.forEach((_, i) => {
      ctx.lineTo(i * xScale, (sparkData[i] - minValue) * yScale);
    });

    // Draw the path
    ctx.stroke();
  }, [sparkColor, sparkData]);

  useEffect(() => drawSparkline(), [drawSparkline]);

  return (
    <Container>
      <canvas ref={canvasRef} width={width} height={height} />
    </Container>
  );
};

export default Sparkline;
