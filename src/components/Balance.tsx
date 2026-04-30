import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface BalanceProps {
  value: number;
  className?: string;
  prefix?: string;
}

export default function Balance({ value, className = "", prefix = "$" }: BalanceProps) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const displayValue = useTransform(spring, (current) => 
    `${prefix}${current.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.span className={className}>
      {displayValue}
    </motion.span>
  );
}
