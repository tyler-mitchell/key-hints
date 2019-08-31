import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback
} from "react";
import ResizeObserver from "resize-observer-polyfill";

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
}

export function useDimensions({ liveMeasure = true } = {}) {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);
  const ref = useCallback(node => {
    setNode(node);
  }, []);
  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        );
      measure();
      if (liveMeasure) {
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure);
        return () => {
          window.removeEventListener("resize", measure);
          window.removeEventListener("scroll", measure);
        };
      }
    }
  }, [node]);
  return [ref, dimensions, node];
}
function getDimensionObject(node) {
  const rect = node.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: "x" in rect ? rect.x : rect.top,
    left: "y" in rect ? rect.y : rect.left,
    x: "x" in rect ? rect.x : rect.left,
    y: "y" in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom
  };
}

export default function useMeasurer(ref, ...types) {
  const animationFrameID = useRef(null);
  const observer = useRef(null);
  const [rect, setRect] = useState({});

  const measure = useCallback(() => {
    animationFrameID.current = window.requestAnimationFrame(() => {
      setRect(getContentRect(ref.current, types));
    });
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    observer.current = new ResizeObserver(measure);
    observer.current.observe(ref.current);

    return () => {
      observer.current.disconnect();
      window.cancelAnimationFrame(animationFrameID.current);
    };
  }, []);

  return rect;
}

function getContentRect(node, types) {
  const calculations = {};

  if (types.includes("client")) {
    calculations.client = {
      top: node.clientTop,
      left: node.clientLeft,
      width: node.clientWidth,
      height: node.clientHeight
    };
  }

  if (types.includes("offset")) {
    calculations.offset = {
      top: node.offsetTop,
      left: node.offsetLeft,
      width: node.offsetWidth,
      height: node.offsetHeight
    };
  }

  if (types.includes("scroll")) {
    calculations.scroll = {
      top: node.scrollTop,
      left: node.scrollLeft,
      width: node.scrollWidth,
      height: node.scrollHeight
    };
  }

  if (types.includes("bounds")) {
    const rect = node.getBoundingClientRect();
    calculations.bounds = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  }

  if (types.includes("margin")) {
    const styles = getComputedStyle(node);
    calculations.margin = {
      top: styles ? parseInt(styles.marginTop, 10) : 0,
      right: styles ? parseInt(styles.marginRight, 10) : 0,
      bottom: styles ? parseInt(styles.marginBottom, 10) : 0,
      left: styles ? parseInt(styles.marginLeft, 10) : 0
    };
  }

  return calculations;
}
