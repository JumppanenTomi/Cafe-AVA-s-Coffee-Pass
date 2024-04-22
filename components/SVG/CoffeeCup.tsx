export default function CoffeeCup(props: {
  filled: boolean;
  key?: string | number;
  className?: string | undefined;
}) {
  return props.filled ? (
    <svg
      key={props.key}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-2 -6 24 24'
      width='26'
      fill='#000'
      className={props.className || "w-10 h-10"}
    >
      <path d='M0 0h17a3 3 0 0 1 0 6h-1.252A8 8 0 0 1 0 4V0zm16 4h1a1 1 0 0 0 0-2h-1v2z'></path>
    </svg>
  ) : (
    <svg
      key={props.key}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-2 -6 24 24'
      width='26'
      fill='#000'
      className={props.className || "w-10 h-10"}
    >
      <path d='M2 4a6 6 0 1 0 12 0V2H2v2zm14-4h1a3 3 0 0 1 0 6h-1.252A8 8 0 0 1 0 4V0h16zm0 4h1a1 1 0 0 0 0-2h-1v2z'></path>
    </svg>
  );
}
