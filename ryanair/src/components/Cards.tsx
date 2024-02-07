import React from 'react'

import { ListBox, ListBoxItem, ProgressBar, Text } from "react-aria-components";
import { useAsyncList } from "react-stately";
import CheckCircleIcon from "@spectrum-icons/workflow/CheckmarkCircle";

type Item = {
  user: { name: string };
  urls: { regular: string };
  alt_description: string;
};

function ImageGridExample() {
  let list = useAsyncList<Item, number>({
    async load({ signal, cursor }) {
      let page = cursor || 1;
      let res = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=25&client_id=AJuU-FPh11hn7RuumUllp4ppT8kgiLS7LtOHp_sp4nc`,
        { signal }
      );
      let items = await res.json();
      return { items, cursor: page + 1 };
    },
  });

  let renderEmptyState = () => {
    if (list.isLoading) {
      return <ProgressCircle />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-teal-500 p-2 sm:p-8 rounded-lg flex justify-center">
      <ListBox
        aria-label="Images"
        items={list.items}
        selectionMode="multiple"
        layout="grid"
        renderEmptyState={renderEmptyState}
        className="overflow-auto outline-none bg-white rounded-lg shadow p-2 h-[350px] w-full max-w-[372px] grid grid-cols-3 gap-3 empty:flex"
      >
        {(item) => (
          <ListBoxItem
            textValue={item.user.name}
            className="relative rounded outline-none group cursor-default"
          >
            <img
              src={item.urls.regular}
              alt={item.alt_description}
              className="h-[80px] w-full object-cover rounded group-selected:ring-2 group-focus-visible:ring-4 group-selected:group-focus-visible:ring-4 ring-offset-2 ring-sky-600"
            />
            <Text
              slot="label"
              className="text-[11px] text-gray-700 font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-full block mt-1"
            >
              {item.user.name}
            </Text>
            <div className="absolute top-2 left-2 text-sky-800 rounded-full leading-[0] bg-white border border-white border-solid hidden group-selected:block">
              <CheckCircleIcon size="S" />
            </div>
          </ListBoxItem>
        )}
      </ListBox>
    </div>
  );
}

function ProgressCircle() {
  return (
    <ProgressBar
      aria-label="Loading…"
      isIndeterminate
      className="flex items-center justify-center w-full"
    >
      <svg
        className="animate-spin h-5 w-5 text-sky-800"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25 stroke-current stroke-[4px]"
          cx="12"
          cy="12"
          r="10"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </ProgressBar>
  );
}