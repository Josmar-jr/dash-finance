import { CurrencyEntries, CurrencyOuts, CurrencyTotal } from "./Currency";

export function Icon(props: React.SVGProps<SVGSVGElement>) {
  switch (props.name.toLowerCase()) {
    case "currency-entries":
      return <CurrencyEntries {...props} />;
    case "currency-outs":
      return <CurrencyOuts {...props} />;
    case "currency-total":
      return <CurrencyTotal {...props} />;
    default:
      return <p>Enter a name to load an icon!</p>
  }
}
