# PremiaTables
1. StandardTable is a detail representation of Master-Detail screen. It always work with a parent form.

## StandardTable

### Syntax

```jsx
<StandardTable
    configuration={configuration}
    style={style}
    theme={theme}
    data={data}
    dataSource={dataSource}
    loadingSource={loadingSource}
    refreshData={refreshDataa}

    lineMenu={lineMenu}
    lineMenuInquireHandler={lineMenuInquireHandler}
    lineMenuActionHandler={lineMenuActionHandler}

    commandBarButtons={commandBarButtons}
    commandBarInquireHandler={commandBarInquireHandler}
    commandBarActionHandler={commandBarActionHandler}

    sideBarButtons={sideBarButtons}
    sideBarInquireHandler={sideBarInquireHandler}
    sideBarActionHandler={sideBarActionHandler}

    containerRef={containerRef}
    doSearch={doSearch}
    doDetailSearch={doDetailSearch}
    disabled={disabled}
/>
```

### Props

#### `configuration`
table and column configuration details. `id`, `_seq_`, and `_line_no_` are mandatory columns.

```json
{
    general: {
      showGrandSum: true,
      showFilterSum: true,
      addSystemButtonsToSideBar: true
    },
    columns: [
      {
        name: 'id',
        label: 'ID',
        type: 'number',
        align: 'center',
        length: 30,
        decimals: 0,
        visible: { 'xs': false, 'sm': false, 'md': false, 'lg': false, 'xl': false, '2xl': false, '3xl': false },
        autosum: false
      },
      {
        name: '_seq_',
        label: '_seq_',
        type: 'number',
        align: 'left',
        length: 70,
        decimals: 0,
        visible: { 'xs': false, 'sm': false, 'md': false, 'lg': false, 'xl': false, '2xl': false, '3xl': false },
        autosum: false
      },
      {
        name: '_line_no_',
        label: 'Line No',
        type: 'number',
        align: 'left',
        length: 70,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      {
        name: 'part_code',
        label: 'Part Code',
        type: 'string',
        align: 'left',
        length: 90,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      {
        name: 'supplier',
        label: 'Supplier',
        type: 'object',
        align: 'left',
        length: 320,
        decimals: 0,
        visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        select: ['code', 'description'],
        concatChar: " - ",
        autosum: false
      },
      {
        name: 'delivery_date',
        label: 'Delivery Date',
        type: 'date',
        align: 'left',
        length: 270,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      }
    ]
  }
```

#### `style`
table styling details

#### `theme`
specifies which theme to be applied

#### `data`
data

#### `dataSource`
data source in which the table has been attached to

#### `loadingSource`
current loading data source

#### `refreshData`
callback to refresh data

#### `lineMenu`
line menu configurations

#### `lineMenuInquireHandler`
line menu inquire handler callback

#### `lineMenuActionHandler`
line menu action handler callback

#### `commandBarButtons`
command bar configuration

#### `commandBarInquireHandler`
command bar inquire callback

#### `commandBarActionHandler`
command bar action handler callback

#### `sideBarButtons`
side bar configuration

#### `sideBarInquireHandlers`
side bar inquire callback

#### `sideBarActionHandler*`
side bar action handler callback

#### `containerRef`
used in column resizing when table is resized

#### `doSearch`
search callback

#### `doDetailSearch`
detail search callback

#### `disabled`
disables all button actions



### Default Props
