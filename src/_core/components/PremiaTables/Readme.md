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
table and column configuration details

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
