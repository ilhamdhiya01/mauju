/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  // SortingState,
  getPaginationRowModel,
  createColumnHelper,
  AccessorFn,
  CellContext,
} from '@tanstack/react-table';
import classNames from 'classnames';
// import { customTableFilter, stringFormula } from '@utils/editor/screen/helper';
// import { utils, writeFile } from 'xlsx';
// import SelectInput from '@components/v1/userApplication/atoms/SelectInput';
import { css } from '@emotion/css';
// import useScreenComponentTheme from '@hooks/editor/screen/useScreenComponentTheme';
import Icon from '../Icon';
import Input from '../Input';
import Button from '../Button';
import SelectInput from '../SelectInput';

export type TableColumns = {
  header: string;
  isWithFormula?: boolean;
  accessorKey?: string;
  enableSorting?: boolean;
  // size?: number;
  // minSize?: number;
  // maxSize?: number;
  formula?: string;
  accessorFn?: (row: any) => string;
  cell?: ({ row }: CellContext<any, any>) => any;
}[];

interface TableProps {
  columns: TableColumns;
  datas: any[];
  isSearchable?: boolean;
  isExportable?: boolean;
  disableExport?: boolean;
  disableOverflow?: boolean;
  exportFileName?: string;
  isRowClickable?: boolean;
  rowIdAccessor?: string;
  onRowClick?: (data: { [key: string]: any }) => void;
  defaultRowSize?: number;
  renderActionButton?: JSX.Element;
  hidePagination: boolean;
  onRowSelect?: 'none' | 'navigate';
  customEmptyState?: React.ReactNode;
}

export const SHOW_PAGE_OPTIONS: SelectOption[] = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '40', value: '40' },
  { label: '50', value: '50' },
];

const Table = ({
  columns,
  datas,
  isSearchable,
  // isExportable,
  // disableExport,
  disableOverflow,
  isRowClickable,
  onRowClick,
  rowIdAccessor,
  // exportFileName,
  hidePagination = false,
  defaultRowSize = 5,
  renderActionButton,
  onRowSelect = 'none',
  customEmptyState,
}: TableProps) => {
  const tableRef = useRef<HTMLTableElement>(null);
  // const { lighten, neutral } = useScreenComponentTheme();
  const [globalFilter, setGlobalFilter] = React.useState('');
  // const [sorting, setSorting] = React.useState<SortingState>([]);
  const [tableColumns, setTableColumns] = React.useState<ColumnDef<any, any>[]>(
    []
  );

  const columnHelper = createColumnHelper<any>();

  useEffect(() => {
    setTableColumns(
      columns.map((column) => {
        const accessor: string | number | symbol | AccessorFn<any> =
          column.isWithFormula === true && column.formula !== undefined
            ? (row: any) => console.log(row)
            : column.accessorKey !== undefined
              ? column.accessorKey
              : '';
        return column.cell !== undefined
          ? columnHelper.display({
              id: column.header,
              header: column.header,
              cell: column.cell,
              // size: column.size,
              // minSize: column.minSize,
              // maxSize: column.maxSize,
              enableSorting:
                column.enableSorting !== undefined
                  ? column.enableSorting
                  : true,
            })
          : columnHelper.accessor(accessor, {
              id: column.header,
              header: column.header,
              // size: column.size,
              // minSize: column.minSize,
              // maxSize: column.maxSize,
              enableSorting:
                column.enableSorting !== undefined
                  ? column.enableSorting
                  : true,
            });
      })
    );
  }, [columns]);

  const isEmptyDatas = datas?.length === 0;

  const table = useReactTable({
    columns: tableColumns,
    data: datas,
    state: {
      // sorting,
      globalFilter,
    },
    // filterFns: {
    //   customFilter: customTableFilter,
    // },
    // onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: hidePagination && getPaginationRowModel(),
    getRowId: (row, index) => (rowIdAccessor ? row[rowIdAccessor] : `${index}`),
    ...(!hidePagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : null),
    filterFns: undefined,
  });

  useEffect(() => {
    table.setPageSize(defaultRowSize);
  }, [defaultRowSize]);

  // const handleExportToExcel = () => {
  //   const workbook = utils.table_to_book(tableRef.current, {
  //     raw: true,
  //   });
  //   // export
  //   writeFile(
  //     workbook,
  //     `${
  //       exportFileName === '' || exportFileName === undefined
  //         ? 'Export Data'
  //         : exportFileName
  //     }.xlsx`
  //   );
  // };

  const tableContainerStyle = css({
    border: `1px solid #e5e5e5`,
  });

  const theadStyle = css({
    borderBottom: `1px solid #e5e5e5`,
  });

  const thStyle = css({
    background: '#f5f5f5',
  });
  const thFirstRowStyle = css({
    position: 'sticky',
    right: 0,
    background: '#f5f5f5',
  });

  const tdFirstRowStyle = css({
    position: 'sticky',
    right: 0,
    background: 'white',
  });

  const tBodyRowStyle = css({
    '&:last-child': {
      borderBottom: 'none',
    },
    // '&:hover': {
    //   '&>td': {
    //     background: '#',
    //   },
    // },
    userSelect: 'text',
    borderBottom: `1px solid #e5e5e5`,
  });

  // Render the UI for your table
  return (
    <div className="flex flex-col w-full p-1">
      {columns.length === 0 ? (
        <div className="flex flex-col items-center w-full py-2">
          <p className="font-semibold text-gray-600">Empty table data.</p>
          <p className="text-sm text-gray-400">
            Please select data or columns to display.
          </p>
        </div>
      ) : (
        <>
          {isSearchable && (
            <div className="flex items-center w-full mb-2">
              <div className="flex items-center flex-1 gap-2">
                <div>
                  <Input
                    placeholder="Search"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                  />
                </div>
                {/* {isExportable && (
                  <div>
                    <Button
                      icon="TbDownload"
                      label="Export"
                      variant="outlined"
                      disabled={disableExport}
                      onClick={() => handleExportToExcel()}
                    />
                  </div>
                )} */}
              </div>
              <div className="flex items-center justify-end flex-1">
                {renderActionButton}
              </div>
            </div>
          )}
          <div className="">
            <div
              className={classNames('rounded-md', tableContainerStyle, {
                'overflow-hidden': !disableOverflow,
              })}
            >
              <div
                className={classNames('w-full', {
                  'overflow-x-auto': !disableOverflow,
                })}
              >
                <table ref={tableRef} className="w-full border-collapse">
                  <thead className={classNames(theadStyle)}>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            className={classNames(
                              'text-xs text-black font-semibold px-4 py-3 h-[43px]',
                              thStyle
                            )}
                            key={header.id}
                            // style={{ width: header.getSize() }}
                          >
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none flex items-center'
                                  : 'select-none text-left',
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              <div className="min-w-[30px] ml-1">
                                {{
                                  asc: (
                                    <Icon
                                      icon="TbArrowUp"
                                      className="w-4 h-4"
                                    />
                                  ),
                                  desc: (
                                    <Icon
                                      icon="TbArrowDown"
                                      className="w-4 h-4"
                                    />
                                  ),
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </div>
                            </div>
                          </th>
                        ))}
                        {onRowSelect === 'navigate' ? (
                          <th
                            className={classNames(
                              'text-xs text-black font-semibold px-4 py-3 h-[43px] w-[76px]',
                              thFirstRowStyle
                            )}
                          >
                            {}
                          </th>
                        ) : null}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="w-full">
                    {table?.getRowModel()?.rows?.map((row) => (
                      <tr
                        className={classNames(tBodyRowStyle, {
                          'hover:cursor-pointer': isRowClickable,
                        })}
                        key={row.id}
                        // {...(isRowClickable &&
                        //   onRowClick && {
                        //     onClick: () => onRowClick(row.original),
                        //   })}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            className="text-xs text-black px-4 py-3 h-[43px]"
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                        {onRowSelect === 'navigate' ? (
                          <td
                            className={classNames(
                              'text-sky-500 px-4 py-3 h-[43px] w-[76px]',
                              tdFirstRowStyle
                            )}
                            {...(isRowClickable &&
                              onRowClick && {
                                onClick: () => onRowClick(row.original),
                              })}
                          >
                            <Button
                              startIcon={{
                                icon: 'TbArrowUpRight',
                                isEnabled: true,
                              }}
                              variant="ghost"
                              {...(onRowSelect === 'navigate' &&
                                onRowClick && {
                                  onClick: () => onRowClick(row.original),
                                })}
                            />
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {isEmptyDatas && <>{customEmptyState}</>}
              </div>
            </div>
            {!hidePagination && !isEmptyDatas ? (
              <div className="flex w-full items-center min-h-[30px] p-2 justify-between">
                <div className="flex items-center">
                  <p className="mr-2 text-xs">Showing</p>
                  <SelectInput
                    isMulti={false}
                    options={SHOW_PAGE_OPTIONS}
                    value={table.getState().pagination.pageSize.toString()}
                    placeholder="Show page..."
                    menuPlacement="top"
                    color="secondary"
                    inputSize="small"
                    onChange={(newValue: any) =>
                      table.setPageSize(parseInt(newValue?.value as string, 10))
                    }
                  />
                  <p className="ml-2 text-xs whitespace-nowrap">
                    of {datas.length} {datas.length > 1 ? 'entries' : 'entry'}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    color="secondary"
                    size="small"
                    startIcon={{ icon: 'TbChevronsLeft', isEnabled: true }}
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  />
                  <Button
                    variant="ghost"
                    size="small"
                    color="secondary"
                    startIcon={{ icon: 'TbChevronLeft', isEnabled: true }}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  />
                  <Button
                    variant="ghost"
                    size="small"
                    color="secondary"
                    startIcon={{ icon: 'TbChevronRight', isEnabled: true }}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  />
                  <Button
                    variant="ghost"
                    size="small"
                    color="secondary"
                    startIcon={{ icon: 'TbChevronsRight', isEnabled: true }}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  />
                  <div className="flex items-center">
                    <p className="mr-1 text-xs">Page</p>
                    <p className="text-xs font-semibold">
                      {table.getState().pagination.pageIndex + 1} of{' '}
                      {table.getPageCount()}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
