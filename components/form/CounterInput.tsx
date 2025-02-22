"use client";

import { useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

function CounterInput({
  detail,
  defaultValue,
}: {
  detail: string;
  defaultValue?: number;
}) {
  const [count, setCount] = useState(defaultValue || 0);
  const increaseCount = () => setCount((prevCount) => prevCount + 1);
  const decreaseCount = () => {
    setCount((prevCount) => {
      if (prevCount > 0) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };
  return (
    <Card className="mb-4">
      <input type="hidden" name={detail} value={count} />

      <CardHeader className="flex flex-col gapy-5">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col">
            <h2 className="font-medium capitalize">{detail}</h2>
            <p className="text-muted-foreground text-sm">
              Select the number of {detail}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={decreaseCount}
            >
              <Minus className="w-5 h-5 text-primary" />
            </Button>
            <span className="text-xl font-bold w-5 text-center">{count}</span>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={increaseCount}
            >
              <Plus className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default CounterInput;
