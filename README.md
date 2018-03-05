# root-rhythm

Root-rhythm is a grid-layout/baseline typography library with several helpers intended to make it easier to lock down layouts to a specific rhythm. 

## Function reference

### Grid / Baseline functions

`@mixin rr-grid-overlay()` : Creates `::before` and `::after` pseudo-elements on whatever container this is added to. The `::before` pseudo-element contains the column overlay and the `::after` container displays the baselines.

`@mixin rr-font-line-height()` : Pass a font size and the number of extra grid units you want the text to occupy and this mixin will generate both font-size and line-height properties for you. Using this ensures your line height always snaps to a grid unit.

`@mixin rr-slab` : Generates the responsive code for a slab, or horizontal container, based on the global configuration. Using this makes sure your padding across slabs is uniform.

`@mixin rr-slab-wrapper($margins: false)`: Generates the content wrapper for a slab, ensuring max-width and margins are properly set. `$margins: false` will strip the top margin from the first child and the bottom margin from the last child so those margins do not overflow the container.

`@mixin rr-slab-adjacency($style-list)`: Pass this a list of slab styles (without the preceding `.`) and this mixin will generate all necessary adjacency rules to ensure the spacing between two slabs of the same style is compressed. 

`@mixin css-grid-colums($templates, $config, $class-prefix, $reverse)` generates CSS grid layouts from the configuration options for the grid.

### Utilities

`@function rr-breakpoint-list($config: $rr-grid-settings)`: Provides a list of breakpoints in a grid configuration object. 

`@function rr-breakpoint($tag)`: Returns the configuration for a specific breakpoint.

`@function rr-gridbase()`: Returns the size of one grid unit (in the same units as the line-height definition).

`@function rr-grid-remainder($offset, $steps)`: I use this a lot for objects with borders; pass the border width as the offset and the number of grid steps the border needs to go around and this will return a value to use for padding that ensures the border matches the grid layout.

`@mixin rr-break-directive($break, $config)`: Block-level mixin that will wrap the content of the block in a media query defined in `$config` and breakpoint `$break`. 

`@function rr-combined-breakpoint($break)`: Returns the specified breakpoint configuration as well as all properties defined in earlier breakpoints but not overridden in the current one. This … makes more sense when you do it.

`@function rr-prop-for-breakpoint($break, $prop)`: Returns the specified property taking into consideration inheritance from earlier breakpoints.

`@function rr-strict-prop-for-breakpoint($break, $prop)`: Returns the specified property *only* if it is defined in the current breakpoint.

## Configuration

RR provides a number of sensible configuration variables which you can override with your own, probably less sensible, values if you need to. Some of the values are dependent upon responsive breakpoints. Sizes are generally defined in `rems` to provide a good balance between predictability and scalability.

### Single-value variables

`$rr-maxwidth: 72rem !default`: Maximum width of the content area. If you are going for a full fluid design, this value will be 0. 

`$rr-maxwidth-margin: 4rem !default`: How much space to put around the max content area before the `xl` breakpoint kicks in. If you are going for a full fluid design, this value should be 0.

`$rr-line-height: 1rem !default`: The 0-level line height.

`$rr-grid-divisions: 2 !default`: How many grid squares will fit vertically inside the line height. Ideally this will be a whole number. 

`$rr-blend-mode: exclusion !default`: What blend mode to use on the grid overlay. Not supported by microsoft browsers.

`$rr-support-ie: true !default`: Whether or not an attempt should be made to support IE 11 CSS grids. (IE < 10 is not supported.)

### Grid settings

Default responsive settings, assuming a mobile-first approach. The first breakpoint will be used as the  default settings outside of a media query. If you do not redefine a setting in a larger breakpoint it will inherit from one of the smaller breakpoints, just as you would expect. 

Breakpoint names are arbitrary; the first breakpoint is used as the default settings.

Property values: 

`mq`: either `max-width` or `min-width`.

`size`: The breakpoint position.

`columns:` How many content columns to show at this breakpoint.

`gutter:` How wide the gutters between the columns should be at this breakpoint.

`offset:` How much space to reserve as margins on the left and right of the layout at this breakpoint.

`vspace:` The default spacing between "slabs" at this breakpoint.

`column_color:` The color of the column in the grid overlay.

`baseline_color: ` The color of the baseline grid. 

Absent values in larger breakpoints inherit the most recently defined value from a previous breakpoint.

```
$rr-grid-settings: ( 
    s: ( 
        mq: max-width, 
        size: 35rem, 
        columns: 4, 
        gutter: 1rem / $rr-grid-divisions, 
        offset: 1rem, 
        vspace: 2,
        column_color: rgba(128, 128, 128, .2),
        baseline_color: rgba(128, 128, 128, .2)
    ), 
    m: ( 
        mq: min-width, 
        size: 35rem, 
        columns: 8, 
        gutter: 1rem,
        offset: 2rem,
        vspace: 3
    ), 
    l: ( 
        size: 48rem, 
        columns: 12
    ), 
    xl: ( 
        size: $rr_maxwidth + 4rem, 
        gutter: 2rem,
        offset: 0,
        vspace: 4
    )
) !default;
```

### CSS Grid settings

This map defines different grid layouts for the CSS Grid functions. Each entry is a map of responsive configuration values. Breakpoint labels should match those in the grid map above.

`$columns` : a CSS-grid definition of the columns and their sizes. This can be different from the grid column definitions above.

`$flex-columns` : How many columns to use in the flex layout fallback for IE 11.

`$areas` : Named areas to match the column definitions.

```
$rr-grids: (
    2-up: (
        m : (
            columns: 1fr 1fr,
            flex-columns: 2
        )
    ),
    3-up: (
        m : (
            columns: 1fr 1fr 1fr,
            flex-columns: 3
        )
    ),
    4-up: (
        m : (
            columns: 1fr 1fr,
            flex-columns: 3
        ),
        l : (
            columns: 1fr 1fr 1fr 1fr,
            flex-columns: 4
        )
    ),
    5-up: (
        m : (
            columns: 1fr 1fr 1fr,
            flex-columns: 3
        ),
        l : (
            columns: 1fr 1fr 1fr 1fr 1fr,
            flex-columns: 5
        )        
    ),
    6-up: (
        m : (
            columns: 1fr 1fr 1fr,
            flex-columns: 3
        ),
        l : (
            columns: 1fr 1fr 1fr 1fr 1fr 1fr,
            flex-columns: 6
        )        
    ),
    sidebar-left: (
        m: (
            columns: 2fr 1fr,
            areas: main side,
            flex-columns: 2
        ),
        l : (
            columns: 1fr 1fr 1fr 1fr,
            areas: main main main side
        )
    ),
    sidebar-right: (
        m: (
            columns: 1fr 2fr,
            areas: side main,
            flex-columns: 2
        ),
        l : (
            columns: 1fr 1fr 1fr 1fr,
            areas: side main main main
        )
    ),
    major-left: (
        m: (
            columns: 1fr 1fr,
            areas: major minor,
            flex-columns: 2
        ),
        l : (
            columns: 1fr 1fr 1fr 1fr 1fr 1fr,
            areas: major major major major minor minor,
        )        
    ),
    major-right: (
        m: (
            columns: 1fr 1fr,
            areas: minor major,
            flex-columns: 2
        ),
        l : (
            columns: 1fr 1fr 1fr 1fr 1fr 1fr,
            areas: minor minor major major major major,
        )
    )
) !default;
```

### 