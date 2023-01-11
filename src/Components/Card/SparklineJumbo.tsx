import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  text-align: center;
  margin-top: 20px;
`;

const Container = styled.div`
  text-align: center;
`;

const SparklineJumbo = ({
  sparkData,
  sparkColor
}: {
  sparkData: number[];
  sparkColor: "red" | "green";
}): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveringData, setHoveringData] = useState<{ price: number; hour: number }>({ price: 0, hour: 0 });
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [show, setShow] = useState<boolean>(false);

  const drawSparkline = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(1, 1);
    ctx.imageSmoothingEnabled = false;
    // Scale the data to fit the canvas
    const maxValue = Math.max(...sparkData);
    const minValue = Math.min(...sparkData);
    const yScale = canvas.height / (maxValue - minValue);
    const xScale = canvas.width / (sparkData.length - 1);

    // Begin a new path
    ctx.beginPath();
    ctx.moveTo(0, (sparkData[0] - minValue) * yScale);
    ctx.strokeStyle = sparkColor;

    // Loop through the data and draw a line to each point
    sparkData.forEach((_, i) => {
      ctx.lineTo(i * xScale, (sparkData[i] - minValue) * yScale);
    });

    // Draw the path
    ctx.stroke();
  }, [sparkColor, sparkData]);

  const updateTooltip = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;

    // Calculate the data point at moust position
    const xScale = canvas.width / (sparkData.length - 1);
    const dataIndex = Math.floor(x / xScale);
    const hoveredData = { price: sparkData[dataIndex], hour: dataIndex };
    setHoveringData(hoveredData);
    // Position the tooltip
    setTooltipPosition({ x: e.clientX, y: e.pageY - 150 });
    // Show tooltip
    setShow(true);
  };

  const hourToTimestamp = (hour: number): string => {
    // Take todays date, subtract hours to get the date of the data point
    const now = new Date();
    now.setHours(now.getHours() - 7 * 24 + hour);
    return now.toLocaleString("default", { month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  };

  const cleanNumber = (num: number): string | undefined => {
    // Prevent blank price
    if (!num) return;
    return num > 1 ? num.toFixed(2) : num.toFixed(5);
  };

  useEffect(() => drawSparkline(), [drawSparkline]);

  const price = cleanNumber(hoveringData.price);
  const timestamp = hourToTimestamp(hoveringData.hour);

  return (
    <Container onMouseLeave={() => setShow(false)}>
      {price && timestamp && show && (
        <div
          style={{
            position: "absolute",
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            backgroundColor: "white",
            color: "black",
            padding: "5px 20px",
            borderRadius: "2px",
            boxShadow: "1px 1px 2px #ccc",
            pointerEvents: "none"
          }}
        >
          <h4>${price} </h4>
          <h5>{timestamp} </h5>
        </div>
      )}
      <Canvas width={700} ref={canvasRef} onMouseMove={updateTooltip}></Canvas>
    </Container>
  );
};

export default SparklineJumbo;
