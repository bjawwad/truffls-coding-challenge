# Services

Services are low-level modules which handle a specific set of data. Many services are a simple interface for an API.

**Note: Services which are defined in here might mock data to not depend on a remote API.**

## Templates

Structure of a `Template`:

```json5
{
    "id": number,           // number – unique identifier of template
    "updated": number,      // number – UNIX timestamp of last update
    "title": string,        // string – human readable identifier of template
    "content": string,      // string – content of template
    "lang": string,         // string ["en", "de"] – defined for which language the template is for
    "active": boolean       // boolean – flag for managing the templates
}
```

In the case of an error, the different functions return an object which bases on [JSON-API errors](https://jsonapi.org/format/#errors-processing).



### `getTemplates`

> Returns a results object with the templates in it.

**Returns:** `Object`

```json5
{
    "count": number,
    "results": Template[]
}
```



### `createTemplate`

> Creates a new template and returns it.

**Arguments:**

* `data`: `Object`

    ```json5
    {
        "title": string,        // string – required
        "content": string,      // string – required
        "lang": string,         // string ["en", "de"] – required
        "active": boolean       // boolean – optional
    }
    ```

**Returns:** `Template`



### `getTemplate`

> Returns the template which matches the given id.

Arguments

* `id`: `number`

**Returns:** `Template`



### `updateTemplate`

> Updates the existing template identified by the given ID. The properties of a template are optional for updating. New properties will be merged into the set of properties.

**Arguments:**

* `id`: `number`
* `data`: `Object`

  ```json5
    {
        "title": string,        // string – optional
        "content": string,      // string – optional
        "lang": string,         // string ["en", "de"] – optional
        "active": boolean       // boolean – optional
    }
    ```

**Returns:** `Template`


### `deleteTemplate`

> Deletes template by the given ID.

**Arguments:**

* `id`: `number`

**Returns:** `null`