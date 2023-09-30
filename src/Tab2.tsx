import {
  Children,
  PropsWithChildren,
  isValidElement,
  useMemo,
  useState,
} from "react";

type Props = PropsWithChildren<{
  defaultOpenKey?: string;
}>;

export default function Tab({ children, defaultOpenKey }: Props) {
  const [openKey, setOpenKey] = useState(() => {
    if (defaultOpenKey) {
      return defaultOpenKey;
    }
    const firstChild = Children.toArray(children)[0];

    if (isTabItem(firstChild)) {
      return firstChild.props.tabKey;
    } else {
      return undefined;
    }
  });

  const tabs = useMemo(
    () =>
      Children.map(children, (child) =>
        isTabItem(child)
          ? {
              title: child.props.title,
              children: child.props.children,
              tabKey: child.props.tabKey,
            }
          : null
      )?.filter((item) => item != null) ?? [],
    [children]
  );

  return (
    <div>
      <div>
        {tabs.map((element, index) => (
          <a
            onClick={(e) => {
              e.preventDefault();
              setOpenKey(element.tabKey);
            }}
            key={element.tabKey}
            style={{
              backgroundColor:
                element.tabKey === openKey || (openKey == null && index === 0)
                  ? "red"
                  : "inherit",
            }}
          >
            {element.title}
          </a>
        ))}
      </div>
      <div>
        {tabs.find((element) => element.tabKey === openKey)?.children ??
          Children.toArray(children)[0]}
      </div>
    </div>
  );
}

type TabItemProps = PropsWithChildren<{
  tabKey: string;
  title: string;
}>;

export function TabItem({ children }: TabItemProps) {
  return <>{children}</>;
}

function isTabItem(
  child: unknown
): child is React.ReactElement<
  TabItemProps,
  string | React.JSXElementConstructor<unknown>
> {
  return isValidElement(child) && child.type === TabItem;
}
