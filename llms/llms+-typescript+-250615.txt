TITLE: Resolving Multiple Root JSX Elements and Missing React Scope (TypeScript)
DESCRIPTION: This TypeScript snippet illustrates two common JSX errors: TS2657 and TS2874. The TS2657 error arises because the expression attempts to assign multiple root JSX elements (<div></div><div></div>) to a variable without a single wrapping parent. The TS2874 error indicates that 'React' is not in scope, which is required for JSX compilation. Both issues must be addressed for valid JSX.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/tsxErrorRecovery3.errors.txt#_snippet_1

LANGUAGE: TypeScript
CODE:
```
var x = <div></div><div></div>
```

----------------------------------------

TITLE: Complete Greeter Class Definition in TypeScript
DESCRIPTION: This snippet defines the Greeter class in TypeScript, showcasing a constructor with public parameter properties, a public greet method, private member variables, and public getter/setter for the greetings property. It demonstrates fundamental object-oriented programming concepts in TypeScript.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapValidationClass.sourcemap.txt#_snippet_14

LANGUAGE: TypeScript
CODE:
```
class Greeter {
    constructor(public greeting: string, ...b: string[]) {
    }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
    private x: string;
    private x1: number = 10;
    private fn() {
        return this.greeting;
    }
    get greetings() {
        return this.greeting;
    }
    set greetings(greetings: string) {
        this.greeting = greetings;
    }
}
```

----------------------------------------

TITLE: Recommended TypeScript Module Syntax in tsconfig.base.json
DESCRIPTION: This JSON snippet demonstrates the correct usage of the `verbatimModuleSyntax` compiler option within a `tsconfig.base.json` file. This option is the recommended replacement for `preserveValueImports` and `importsNotUsedAsValues`, ensuring that module imports are preserved exactly as written.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/verbatimModuleSyntaxCompat4.errors.txt#_snippet_1

LANGUAGE: JSON
CODE:
```
    {
        "compilerOptions": {
            "verbatimModuleSyntax": true
        }
    }
```

----------------------------------------

TITLE: TypeScript: Logical AND Assignment (&&=) with Optional Function
DESCRIPTION: This snippet uses `&&=` to assign a new function only if `f` is truthy. If `f` is initially `undefined`, the assignment doesn't occur, and `f` remains `undefined`. This leads to a `TS2722` error when attempting to invoke `f(42)`.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/logicalAssignment5(target=es2021).errors.txt#_snippet_2

LANGUAGE: TypeScript
CODE:
```
function foo3 (f?: (a: number) => void) {
    f &&= (a => a)
    f(42)
}
```

----------------------------------------

TITLE: Defining Sync Disposable Interface in TypeScript
DESCRIPTION: This snippet defines the `MyDisposable` interface, which includes a `value` property and the `[Symbol.dispose]()` method, making objects conforming to it synchronously disposable. This interface is used for type checking `using` declarations.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/usingDeclarationsWithObjectLiterals1.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
interface MyDisposable {
  value: number;
  [Symbol.dispose](): void;
}
```

----------------------------------------

TITLE: Defining Typed Event Emitters with TypeScript Interfaces
DESCRIPTION: This snippet defines an `interface ClientEvents` to specify event names and their corresponding parameter types as tuples. The `Client` class then uses this interface with a generic `on` method, ensuring type safety for event listeners. This pattern allows for strong typing of event arguments based on the event name.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/dependentDestructuredVariables.errors.txt#_snippet_34

LANGUAGE: TypeScript
CODE:
```
interface ClientEvents {
    warn: [message: string];
    shardDisconnect: [closeEvent: CloseEvent, shardId: number];
}
  
declare class Client {
    public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): void;
}
```

----------------------------------------

TITLE: Enabling `noImplicitAny` in TypeScript Configuration (tsconfig2.json)
DESCRIPTION: This `tsconfig.json` file sets the `noImplicitAny` compiler option to `true`. This option causes TypeScript to report an error whenever a variable, parameter, or return type implicitly has an `any` type, promoting stronger type safety and explicit type declarations.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/configFileExtendsAsList.errors.txt#_snippet_3

LANGUAGE: JSON
CODE:
```
{
        "compilerOptions": {
            "noImplicitAny": true
        }
    }
```

----------------------------------------

TITLE: Defining and Exporting Class A (TypeScript)
DESCRIPTION: This snippet defines a simple TypeScript class named 'A' and exports it, making it accessible for import in other modules. This is a fundamental pattern for creating reusable components in a modular TypeScript application.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/outModuleConcatUmd.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
export class A { }
```

----------------------------------------

TITLE: Defining React Component with Empty Props - TypeScript
DESCRIPTION: This snippet defines a simple React class component `EmptyProp` that does not expect any props or state, indicated by the empty object `{}` in its generic type parameters. It renders a basic `div` element, serving as a minimal example of a functional React component.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/tsxSpreadAttributesResolution4.errors.txt#_snippet_2

LANGUAGE: TypeScript
CODE:
```
class EmptyProp extends React.Component<{}, {}> {
    render() {
        return <div>Default hi</div>;
    }
}
```

----------------------------------------

TITLE: Basic Variable, Class, and Function Definition in TypeScript
DESCRIPTION: This TypeScript snippet showcases fundamental language features including variable declaration, class definition with a public property, class instantiation, and a simple function that returns a class instance. It serves as a minimal example of TypeScript code structure.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/project/maprootUrlsourcerootUrlSingleFileSpecifyOutputFile/node/maprootUrlsourcerootUrlSingleFileSpecifyOutputFile.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
var a1 = 10;
class c1 {
    public p1: number;
}

var instance1 = new c1();
function f1() {
    return instance1;
}
```

----------------------------------------

TITLE: JSX Module Declaration and AppComponent with TS2552 Error
DESCRIPTION: This snippet illustrates a TypeScript class `AppComponent` attempting to render a JSX element (`<div />`) within its `render` method. The accompanying `TS2552` error 'Cannot find name 'createElement'' indicates that the TypeScript compiler cannot locate the `createElement` function, which is essential for JSX transformation. This often points to a missing React import or an incorrect JSX factory configuration in the TypeScript compiler options.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/jsxFactoryIdentifierWithAbsentParameter.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
declare module JSX {
        interface IntrinsicElements {
            [s: string]: any;
        }
    }
    
    export class AppComponent {
        render() {
            return <div />;
        }
    }
```

----------------------------------------

TITLE: Extending an Interface in TypeScript
DESCRIPTION: This snippet demonstrates an attempt to extend an interface `I` with a class `C`. TypeScript disallows extending interfaces; classes should `implement` interfaces instead. The error TS2689 indicates this misuse.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/classExtendsEveryObjectType.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
interface I {
        foo: string;
    }
    class C extends I { } // error
```

----------------------------------------

TITLE: Type Narrowing with Destructured Parameters (Switch) in TypeScript
DESCRIPTION: This function `f12` shows type narrowing using a `switch` statement on a destructured parameter. Each `case` block correctly narrows the type of `payload` based on the `kind`, allowing specific methods to be called. The `default` case demonstrates that `payload` becomes `never` if all union members are handled.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/dependentDestructuredVariables.errors.txt#_snippet_3

LANGUAGE: TypeScript
CODE:
```
function f12({ kind, payload }: Action) {
    switch (kind) {
        case 'A':
            payload.toFixed();
            break;
        case 'B':
            payload.toUpperCase();
            break;
        default:
            payload;  // never
    }
}
```

----------------------------------------

TITLE: Correct Derived Class Constructor with Super Call - TypeScript
DESCRIPTION: This snippet shows a correctly implemented derived class 'D' extending 'C'. Its constructor properly includes a 'super()' call, satisfying TypeScript's requirement for derived class constructors and avoiding error TS2377. This demonstrates the correct way to initialize a parent class from a child constructor.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/superCallInsideClassDeclaration.errors.txt#_snippet_1

LANGUAGE: TypeScript
CODE:
```
class C {
}

class D extends C {
    constructor() {
        super();
    }
}
```

----------------------------------------

TITLE: Original TypeScript For...Of Loop with Destructuring
DESCRIPTION: This TypeScript snippet presents the original, more concise `for...of` loop syntax with nested array destructuring. It directly iterates over the `multiRobots` array, cleanly assigning `nameMA`, `primarySkillA`, and `secondarySkillA` from each robot entry, showcasing a modern and readable iteration pattern.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapValidationDestructuringForOfArrayBindingPattern2.sourcemap.txt#_snippet_48

LANGUAGE: TypeScript
CODE:
```
for ([nameMA, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(nameMA);
}
```

----------------------------------------

TITLE: Using Type Annotations in TypeScript
DESCRIPTION: This snippet shows the correct usage of a type annotation (`: string`) within a TypeScript file. In TypeScript, this syntax is valid and allows for type checking, demonstrating the intended environment for such language features without producing errors.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/parserArrowFunctionExpression15.errors.txt#_snippet_1

LANGUAGE: TypeScript
CODE:
```
false ? (param): string => param : null
```

----------------------------------------

TITLE: Importing from Local Module - TypeScript
DESCRIPTION: This snippet demonstrates importing a named export `fromLocal` from another local TypeScript file `./local`. This is a fundamental pattern for modularizing code within a project, allowing different parts of the application to share functions, classes, or constants.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/autoImportAllowTsExtensions1.baseline.md#_snippet_3

LANGUAGE: TypeScript
CODE:
```
import { fromLocal } from "./local";

fromLocal
```

----------------------------------------

TITLE: Configuring Module Resolution Paths in TypeScript Project (JSON)
DESCRIPTION: This JSON snippet illustrates how to configure conditional exports within a `package.json` file, specifically for a TypeScript project. It sets up distinct paths for type declarations (`.d.mts`, `.d.cts`) and runtime code (`.mjs`, `.cjs`) based on whether the module is imported (ESM) or required (CommonJS), and whether it's for type checking or Node.js execution.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/nodeModulesConditionalPackageExports(module=node16).errors.txt#_snippet_8

LANGUAGE: JSON
CODE:
```
            "./types": {
                "types": {
                    "import": "./index.d.mts",
                    "require": "./index.d.cts"
                },
                "node": {
                    "import": "./index.mjs",
                    "require": "./index.cjs"
                }
            }
```

----------------------------------------

TITLE: Installing Latest Stable TypeScript (Bash)
DESCRIPTION: This command installs the latest stable version of TypeScript as a development dependency in your project using npm. It's typically used for setting up TypeScript in new or existing JavaScript projects, ensuring you have the most reliable release.
SOURCE: https://github.com/microsoft/typescript/blob/main/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install -D typescript
```

----------------------------------------

TITLE: Importing Untyped Module in TypeScript Project (JavaScript)
DESCRIPTION: This JavaScript snippet, part of a TypeScript project, attempts to import the 'untyped' module. TypeScript raises a TS7016 error because 'untyped' lacks a declaration file, leading to an implicit 'any' type. It then accesses properties and calls a method on the imported module.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/namespaceAssignmentToRequireAlias.errors.txt#_snippet_0

LANGUAGE: JavaScript
CODE:
```
const u = require('untyped');
u.assignment.nested = true
u.noError()
```

----------------------------------------

TITLE: Defining Todo Component and Interfaces in TypeScript
DESCRIPTION: Defines the 'TodoProp' and 'TodoListProps' interfaces for type safety, followed by a functional React component named 'Todo'. The 'Todo' component accepts 'key' and 'todo' properties and renders a div displaying their concatenated values, serving as a basic list item.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/tsxSpreadChildrenInvalidType(jsx=react,target=es5).errors.txt#_snippet_1

LANGUAGE: TypeScript
CODE:
```
interface TodoProp {
    id: number;
    todo: string;
}
interface TodoListProps {
    todos: TodoProp[];
}
function Todo(prop: { key: number, todo: string }) {
    return <div>{prop.key.toString() + prop.todo}</div>;
}
```

----------------------------------------

TITLE: Incorrect 'class' Attribute on Another Custom React Component (JSX)
DESCRIPTION: This snippet shows TypeScript errors (TS2322) when `MyComp2` is used with the 'class' attribute instead of 'className'. The errors state that 'class' is not assignable to the component's intrinsic attributes and does not exist, suggesting 'className'. This reinforces the pattern of using `className` for styling props in React components.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/spellingSuggestionJSXAttribute.errors.txt#_snippet_5

LANGUAGE: jsx
CODE:
```
<MyComp2 class="" />;
```

----------------------------------------

TITLE: Handling Unknown Catch Variables in TypeScript
DESCRIPTION: This snippet demonstrates how TypeScript treats implicitly typed catch variables as 'unknown' by default, leading to type errors if operations are performed without type narrowing. It shows examples of type narrowing using 'typeof' and 'instanceof' to safely access properties and methods.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/useUnknownInCatchVariables01.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
try {
    // ...
}
catch (e) {
    // error!
    void e.toUpperCase();
    void e++;
    void e();
    
    if (typeof e === "string") {
        // works!
        // We've narrowed 'e' down to the type 'string'.
        console.log(e.toUpperCase());
    }
    if (e instanceof Error) {
        e.stack?.toUpperCase();
    }
    if (typeof e === "number") {
        e.toExponential();
        e++;
    }
}
```

----------------------------------------

TITLE: Incorrect Resolution Mode Usage with Named Type Imports (TypeScript)
DESCRIPTION: This snippet demonstrates incorrect usage of 'resolution-mode' assertions with 'import {type ...}' syntax. This leads to 'TS1454' errors because 'resolution-mode' can only be set for top-level 'import type' imports. Additionally, 'TS2305' occurs because 'RequireInterface' is not exported as a value from 'pkg', only as a type.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/nodeModulesImportModeDeclarationEmit2(module=node18).errors.txt#_snippet_1

LANGUAGE: TypeScript
CODE:
```
import {type RequireInterface as Req} from "pkg" assert { "resolution-mode": "require" };
import {type ImportInterface as Imp} from "pkg" assert { "resolution-mode": "import" };
export interface Loc extends Req, Imp {}
```

----------------------------------------

TITLE: React Component and Prop Interface Definition (TypeScript)
DESCRIPTION: This snippet defines the `AnotherComponentProps` interface, which specifies the required properties for `AnotherComponent`, including `AnotherProperty1`. It also shows the `AnotherComponent` functional component which destructures `property1` from its props for rendering.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/tsxSpreadAttributesResolution16.errors.txt#_snippet_1

LANGUAGE: TypeScript
CODE:
```
interface AnotherComponentProps {
    property1: string;
    AnotherProperty1: string;
    property2: boolean;
}

function AnotherComponent({ property1 }: AnotherComponentProps) {
    return (
        <span>{property1}</span>
    );
}
```

----------------------------------------

TITLE: Piping Numeric Transformations and Promise Chaining in TypeScript
DESCRIPTION: This snippet showcases the `pipe` function for composing a sequence of numeric transformations (add 1, then multiply by 2). It applies this composed function to a variable `fn30` and also directly within a `Promise.then` callback, demonstrating `pipe`'s utility in creating reusable function pipelines and integrating with asynchronous operations.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/genericFunctionInference1.errors.txt#_snippet_17

LANGUAGE: TypeScript
CODE:
```
type Fn = (n: number) => number;
const fn30: Fn = pipe(
    x => x + 1,
    x => x * 2,
);

const promise = Promise.resolve(1);
promise.then(
    pipe(
        x => x + 1,
        x => x * 2,
    ),
);
```

----------------------------------------

TITLE: Iterating with a For Loop and Logging in TypeScript
DESCRIPTION: This snippet showcases a fundamental 'for' loop in TypeScript, configured to execute a single iteration. Within the loop's body, it utilizes 'console.log' to display the value of the 'primaryA' variable, demonstrating basic control flow and output operations. This example highlights how to structure a simple iterative process and print information to the standard output.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapValidationDestructuringForObjectBindingPattern.sourcemap.txt#_snippet_19

LANGUAGE: TypeScript
CODE:
```
for (i = 0; i < 1; i++) {
    console.log(primaryA);
}
```

----------------------------------------

TITLE: Type Narrowing with Destructured Parameters (If-Else) in TypeScript
DESCRIPTION: This function `f10` demonstrates type narrowing directly on destructured function parameters. By checking the `kind` property within `if` statements, TypeScript correctly infers the specific type of `payload` (number or string), allowing type-safe operations like `toFixed()` or `toUpperCase()`.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/dependentDestructuredVariables.errors.txt#_snippet_1

LANGUAGE: TypeScript
CODE:
```
function f10({ kind, payload }: Action) {
    if (kind === 'A') {
        payload.toFixed();
    }
    if (kind === 'B') {
        payload.toUpperCase();
    }
}
```

----------------------------------------

TITLE: Importing Modules in TypeScript
DESCRIPTION: This TypeScript snippet demonstrates module imports. The `import * as Other from "foo/other"` line is the source of the `TS7016` error, highlighting the need for a declaration file for the `foo/other` module.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/declarationNotFoundPackageBundlesTypes.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
import * as Foo from "foo";
import * as Other from "foo/other"/*1*/;
```

----------------------------------------

TITLE: Configuring Root Package.json for Module Exports in Node.js
DESCRIPTION: This JSON snippet defines the 'package.json' for the root project, specifying '"type": "module"' to indicate it's an ECMAScript module. It uses the 'exports' field to define entry points for CommonJS ('./cjs'), ECMAScript modules ('./mjs'), and a default entry ('.'). This configuration helps Node.js resolve module imports correctly.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/nodeModulesPackageExports(module=node18).errors.txt#_snippet_7

LANGUAGE: JSON
CODE:
```
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}
```

----------------------------------------

TITLE: Logging Variable Value in JavaScript
DESCRIPTION: This snippet demonstrates how to output the value of a variable, `primarySkillA`, to the console using `console.log()`. It's a common method for debugging and displaying information during program execution.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapValidationDestructuringForArrayBindingPattern.sourcemap.txt#_snippet_16

LANGUAGE: JavaScript
CODE:
```
console.log(primarySkillA);
```

----------------------------------------

TITLE: Defining React Component Props with Union Types - TypeScript
DESCRIPTION: This snippet defines the `TextProps` type using a union, allowing the `editable` property to determine the presence of the `onEdit` callback. If `editable` is `true`, `onEdit` is required; otherwise, it's not present, enforcing type safety based on prop values.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/tsxSpreadAttributesResolution6.errors.txt#_snippet_1

LANGUAGE: TypeScript
CODE:
```
type TextProps = { editable: false }
               | { editable: true, onEdit: (newText: string) => void };
```

----------------------------------------

TITLE: Importing Component from Local TSX File in TypeScript
DESCRIPTION: This snippet demonstrates the auto-import of `Component` from a local TypeScript React file (`./Component.tsx`). It shows how the imported `Component` is then referenced, indicating successful import completion and usage within the current file.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/autoImportAllowTsExtensions2.baseline.md#_snippet_1

LANGUAGE: TypeScript
CODE:
```
import { Component } from "./Component.tsx";

Component
```

----------------------------------------

TITLE: Using Logical OR Assignment (||=) with Undefined Arrays in TypeScript
DESCRIPTION: This function demonstrates the `||=` (logical OR assignment) operator. If `results` is falsy (e.g., `undefined`), it's assigned the value of `results1` (or an empty array if `results1` is also falsy). It then pushes `100` to the resulting array. This snippet handles `undefined` gracefully.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/logicalAssignment6(target=es2021).errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
function foo1(results: number[] | undefined, results1: number[] | undefined) {
    (results ||= (results1 ||= [])).push(100);
}
```

----------------------------------------

TITLE: Object Property Destructuring with Default Value in TypeScript
DESCRIPTION: This snippet demonstrates how to destructure a property from an object and assign it to a new variable name (`secondaryA`), providing a default string value of 'secondary' if the original property is undefined. This is commonly used in object assignments or function parameters.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues.sourcemap.txt#_snippet_24

LANGUAGE: TypeScript
CODE:
```
secondary: secondaryA = "secondary"
```

----------------------------------------

TITLE: Function with Multiple Implicit Any Parameters in TypeScript
DESCRIPTION: This function f4 has multiple parameters (x, y, z) without explicit type annotations. TypeScript reports TS7006 errors for each of them when noImplicitAny is active, requiring all parameters to be explicitly typed for type safety.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/noImplicitAnyParametersInBareFunctions.errors.txt#_snippet_3

LANGUAGE: TypeScript
CODE:
```
function f4(x, y, z): void { }
```

----------------------------------------

TITLE: Importing Module with Resolution Error - TypeScript
DESCRIPTION: This snippet shows an import statement for a module named 'missing', which results in a TS2792 error. The error suggests configuring the 'moduleResolution' option to 'nodenext' or adding aliases to the 'paths' option in the TypeScript compiler settings to resolve the module.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/asyncAwaitIsolatedModules_es2017.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
import { MyPromise } from "missing";
```

----------------------------------------

TITLE: Implicit Any in Destructuring and Parameters (Basic)
DESCRIPTION: This function `f1` demonstrates `noImplicitAny` errors (TS7031, TS7006) when destructuring array elements `a`, object properties `b`, and regular parameters `c`, `d` without explicit type annotations. TypeScript infers an `any` type, which is disallowed under `noImplicitAny`.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/noImplicitAnyDestructuringParameterDeclaration.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
function f1([a], {b}, c, d) { }
```

----------------------------------------

TITLE: Creating Generic Settings Access Types in TypeScript
DESCRIPTION: Building upon the `Settings` and `SettingsTypes` definitions, this snippet introduces `GenericSettingsAccess`, a type alias that dynamically creates `Settings` types based on keys of `SettingsTypes`. It then demonstrates its usage with `GenericSettingsResult1` and `GenericSettingsResult2` to create settings types for specific or unioned categories like 'audio' or 'audio | video'.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/mappedTypeRelationships.errors.txt#_snippet_42

LANGUAGE: TypeScript
CODE:
```
type GenericSettingsAccess<T extends keyof SettingsTypes> = Settings<SettingsTypes[T]>;
type GenericSettingsResult1 = GenericSettingsAccess<"audio">;
type GenericSettingsResult2 = GenericSettingsAccess<"audio" | "video">;
```

----------------------------------------

TITLE: Importing Types (After `verbatimModuleSyntax`) in TypeScript
DESCRIPTION: This snippet demonstrates the correct way to import types using the `import type` syntax, as required by `verbatimModuleSyntax`, ensuring no runtime imports.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/preserveValueImports_errors(isolatedmodules=false).errors.txt#_snippet_3

LANGUAGE: TypeScript
CODE:
```
import type DefaultA from "./a";
import type { A } from "./a";
import type DefaultB from "./b";
import type { B } from "./b";
```

----------------------------------------

TITLE: Defining Class A in TypeScript
DESCRIPTION: This snippet defines a standard TypeScript class named `A`. When exported, `A` can be used as both a type and a value, making its constructor available for instantiation in other modules.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/exportDeclaration_moduleSpecifier.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
export class A {}
```

----------------------------------------

TITLE: ESM Imports in TypeScript (.ts)
DESCRIPTION: This snippet demonstrates how ECMAScript modules (ESM) correctly import other modules (CommonJS, ESM, and type-only) within a standard `.ts` file. It shows standard import syntax for various module types without errors, indicating proper resolution in an ESM context.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/nodeModulesDeclarationEmitWithPackageExports(module=node18).errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
// esm format file
    import * as cjs from "package/cjs";
    import * as mjs from "package/mjs";
    import * as type from "package";
    export const a = cjs;
    export const b = mjs;
    export const c = type;
    import * as cjsi from "inner/cjs";
    import * as mjsi from "inner/mjs";
    import * as typei from "inner";
    export const d = cjsi;
    export const e = mjsi;
    export const f = typei;
```

----------------------------------------

TITLE: Defining and Using an Async React Functional Component (RSC) in TypeScript
DESCRIPTION: This snippet defines `RenderPromise`, an `async` functional React component that accepts a `title` prop and returns a promise resolving to a string. This pattern is characteristic of React Server Components (RSCs), where components can perform asynchronous operations. It also demonstrates TypeScript's prop validation for async components.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/jsxElementType.errors.txt#_snippet_8

LANGUAGE: TSX
CODE:
```
const RenderPromise = async ({ title }: { title: string }) => "react";
Component = RenderPromise;
<RenderPromise />;
<RenderPromise title="react" />;
<RenderPromise excessProp />;
```

----------------------------------------

TITLE: Picking Object Properties by Value Type in TypeScript
DESCRIPTION: The `PickByValueType` mapped type creates a new object type containing only properties from `T` whose values are assignable to type `U`. It uses a conditional type within the `as` clause to filter keys. This example demonstrates how to pick properties of type `string` from `Example`, resulting in `T1` containing only `foo`, and confirms that `e2` can only be 'foo'.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/mappedTypeAsClauses.errors.txt#_snippet_6

LANGUAGE: TypeScript
CODE:
```
type Example = {foo: string, bar: number};

type PickByValueType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
};

type T1 = PickByValueType<Example, string>;
const e1: T1 = {
    foo: "hello"
};
type T2 = keyof T1;
const e2: T2 = "foo";
```

----------------------------------------

TITLE: Arrow Function with Multiple Implicit Any Parameters (TS7006) in TypeScript
DESCRIPTION: This arrow function `m_f11` demonstrates implicit 'any' errors for multiple parameters (x, y, and z). The TS7006 errors are reported for each parameter due to the absence of explicit type annotations in the function signature.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/noImplicitAnyParametersInModule.errors.txt#_snippet_10

LANGUAGE: TypeScript
CODE:
```
var m_f11 = (x, y, z) => "";
```

----------------------------------------

TITLE: Using Nullish Coalescing Assignment (??=) for Array Initialization in TypeScript
DESCRIPTION: This function demonstrates the use of the nullish coalescing assignment operator (??=) to initialize an array. If 'results' is null or undefined, it is assigned an empty array. Subsequently, '100' is pushed into the 'results' array, ensuring it's always an array before modification, specifically handling null and undefined.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/logicalAssignment4(target=es2020).errors.txt#_snippet_3

LANGUAGE: TypeScript
CODE:
```
function foo4(results: number[] | undefined) {
    results ??= [];
    results.push(100);
}
```

----------------------------------------

TITLE: Decrement Operator in TypeScript
DESCRIPTION: This snippet demonstrates the post-decrement operator (--) in TypeScript/JavaScript. It decrements the value of variable 'x' by 1. This is a shorthand for 'x = x - 1;'.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapValidationStatements.sourcemap.txt#_snippet_34

LANGUAGE: TypeScript
CODE:
```
x--;
```

----------------------------------------

TITLE: Logging a Variable to Console in TypeScript
DESCRIPTION: This simple snippet uses `console.log()` to output the value of the `nameA` variable to the console. This is a fundamental debugging and output mechanism in JavaScript and TypeScript, used to inspect variable states during program execution.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapValidationDestructuringForOfObjectBindingPattern2.sourcemap.txt#_snippet_58

LANGUAGE: TypeScript
CODE:
```
console.log(nameA);
```

----------------------------------------

TITLE: TypeScript If Statement with Undeclared Variable
DESCRIPTION: This snippet illustrates a TypeScript compilation error (TS2304) where the variable 'a' is referenced within an 'if' condition without prior declaration. The compiler flags this as 'Cannot find name 'a'', indicating that 'a' is not defined in the current scope. To resolve this, 'a' must be declared (e.g., 'let a: any;') before its usage.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/parserIfStatement2.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
if (a) {
}
```

----------------------------------------

TITLE: Using Test Runner and jQuery Globals in TypeScript
DESCRIPTION: This snippet demonstrates the usage of test runner functions ('describe', 'it') and the jQuery global object ('$'). TypeScript reports 'Cannot find name' errors if the corresponding type definitions are not installed. To resolve these, install '@types/jest' or '@types/mocha' for test runners, and '@types/jquery' for jQuery.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/didYouMeanSuggestionErrors.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
describe("my test suite", () => {
    it("should run", () => {
        const a = $(".thing");
    });
});
```

----------------------------------------

TITLE: Basic Synchronous Using Declaration in TypeScript
DESCRIPTION: This example shows a basic `using` declaration where an object literal directly implements the `[Symbol.dispose]()` method. It demonstrates the simplest form of synchronous resource management using the `using` keyword.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/usingDeclarationsWithObjectLiterals1.errors.txt#_snippet_1

LANGUAGE: TypeScript
CODE:
```
{
  using _ = { [Symbol.dispose]() {} };
}
```

----------------------------------------

TITLE: Importing ESM in CommonJS TypeScript (.ts) - Error TS1479
DESCRIPTION: This TypeScript snippet demonstrates an 'import' statement in a '.ts' file, which is treated as a CommonJS module by default or due to 'package.json' settings. It attempts to import an ECMAScript module ('./module.mjs'), resulting in TS1479 because CommonJS 'require' cannot load ESM directly. The suggested fix is to change the file extension to '.mts' or configure 'type: "module"' in 'package.json'.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/nodeModulesCJSResolvingToESM2_cjsPackageJson.errors.txt#_snippet_2

LANGUAGE: TypeScript
CODE:
```
import {} from "./module.mjs";
```

----------------------------------------

TITLE: Calling toString on a 'never' type in TypeScript
DESCRIPTION: This snippet demonstrates a line of TypeScript code where the `toString` method is invoked on a variable `x`. The accompanying compiler error indicates that `x` has been inferred as the `never` type, which means it cannot have any properties, leading to a TS2339 error. This often happens in code branches that are logically unreachable.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/typeGuardsInIfStatement.errors.txt#_snippet_12

LANGUAGE: TypeScript
CODE:
```
x.toString(); // boolean | string
```

----------------------------------------

TITLE: Discriminated Union Narrowing Without Generic Type Parameters (Working)
DESCRIPTION: This snippet shows the correct and expected behavior of type narrowing for discriminated unions when a concrete union type `Pet` is used directly as the parameter type. After the check `if(pet.type === 'dog')`, TypeScript successfully narrows the type of `pet` to `Dog`, allowing direct and safe access to the `saysWoof` property without errors.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/narrowingOfQualifiedNames.errors.txt#_snippet_3

LANGUAGE: TypeScript
CODE:
```
function handleDogWorking(pet: Pet) {
    if(pet.type === 'dog') {
        const _okay1 = pet.saysWoof;
        const _okay2: typeof pet.saysWoof = pet.saysWoof;
    }
}
```

----------------------------------------

TITLE: Assigning Number Array to String Type in TypeScript
DESCRIPTION: This snippet illustrates assigning a `number[]` to a `string` type variable. TypeScript generates a TS2322 error, as an array of numbers cannot be assigned to a primitive string type.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/assignmentIndexedToPrimitives.errors.txt#_snippet_4

LANGUAGE: TypeScript
CODE:
```
const s1: string = [0];
```

----------------------------------------

TITLE: Logging Variable to Console (JavaScript)
DESCRIPTION: This JavaScript snippet uses `console.log` to output the value of the `nameA` variable to the console, typically for debugging purposes.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapValidationDestructuringForOfArrayBindingPatternDefaultValues2.sourcemap.txt#_snippet_16

LANGUAGE: JavaScript
CODE:
```
console.log(nameA);
```

----------------------------------------

TITLE: Configuring TypeScript Compiler Options with Module Resolution Error - JSON
DESCRIPTION: This snippet illustrates a `tsconfig.json` configuration that triggers the TS5095 error. The error occurs because 'moduleResolution' is set to 'bundler', which is incompatible with 'module' being set to 'commonjs'. To resolve this, 'module' should be 'preserve' or 'es2015' or later when 'moduleResolution' is 'bundler'.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/bundlerOptionsCompat.errors.txt#_snippet_0

LANGUAGE: JSON
CODE:
```
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "bundler",
    "noEmit": true
  }
}
```

----------------------------------------

TITLE: Configuring TypeScript Compiler Options (tsconfig.json)
DESCRIPTION: This snippet defines the TypeScript compiler options in 'tsconfig.json', setting the target to ES5, module system to CommonJS, and enabling decorator metadata and experimental decorators. It also specifies 'main.ts' as the file to compile. This configuration is relevant for Angular 2 projects and is part of the context for the module resolution error.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/project/emitDecoratorMetadataCommonJSISolatedModules/amd/emitDecoratorMetadataCommonJSISolatedModules.errors.txt#_snippet_0

LANGUAGE: JSON
CODE:
```
{
  "compileOnSave": true,
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "isolatedModules": true
  },
  "files": [
    "main.ts"
  ]
}
```

----------------------------------------

TITLE: Declaring Arrow Functions with 'const' Type Parameters in TypeScript
DESCRIPTION: This snippet illustrates the use of the `const` modifier on type parameters in arrow function expressions. Both `fx1` and `fx2` (with a trailing comma for clarity) correctly apply the `const` modifier, enabling narrow literal type inference for the function arguments and return values.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/typeParameterConstModifiers.errors.txt#_snippet_8

LANGUAGE: TypeScript
CODE:
```
const fx1 = <const T>(x: T) => x;
const fx2 = <const T,>(x: T) => x;
```

----------------------------------------

TITLE: Defining React-like Components and Interfaces with Nested Props in TypeScript
DESCRIPTION: This snippet defines several TypeScript interfaces and a functional component (`TestComponent`) to illustrate how nested properties are structured. It includes `StatelessComponent` for a React-like component signature, `ITestProps` for basic properties, `NestedProp` to wrap other props, and `TestProps` which uses `NestedProp`. The subsequent line demonstrates an incorrect usage where an `INVALID_PROP_NAME` is passed to `ITestProps`, triggering a `TS2353` error due to excess property checking.
SOURCE: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/deepExcessPropertyCheckingWhenTargetIsIntersection.errors.txt#_snippet_0

LANGUAGE: TypeScript
CODE:
```
interface StatelessComponent<P = {}> {
  (props: P & { children?: number }, context?: any): null;
}
 
const TestComponent: StatelessComponent<TestProps> = (props) => {
  return null;
}
 
interface ITestProps {
  ariaLabel?: string;
}
 
interface NestedProp<TProps> {
  props: TProps;
}
 
interface TestProps {
  icon: NestedProp<ITestProps>;
}
 
TestComponent({icon: { props: { INVALID_PROP_NAME: 'share', ariaLabel: 'test label' } }});
```