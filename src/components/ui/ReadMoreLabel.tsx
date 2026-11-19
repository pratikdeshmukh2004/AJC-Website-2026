/**
 * The "Read more" / "Read less" label shared by every expandable block. Put
 * `group/readmore` on the button around it: hovering the button draws an
 * underline under the label from left to right.
 */
export function ReadMoreLabel({ expanded }: { expanded: boolean }) {
  return (
    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-position-[0_100%] bg-no-repeat pb-[0.15em] transition-[background-size] duration-300 ease-out group-hover/readmore:bg-size-[100%_1px] group-focus-visible/readmore:bg-size-[100%_1px]">
      {expanded ? "Read less" : "Read more"}
    </span>
  );
}
