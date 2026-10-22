---
sidebar_position: 2
---

# Design patterns

A design pattern is a named solution to a problem that recurs. Name the problem first, then pick the pattern. If you cannot state the problem in one sentence, you do not need the pattern yet ([KISS and YAGNI](./design-principles.md)).

Patterns are most useful as shared vocabulary: "this is an adapter" tells a reviewer the intent faster than a paragraph. They are not templates to copy, and a language feature often replaces them. Python modules are already singletons, and first-class functions often replace a Strategy class.

Before using a pattern, pass the [abstraction decision test](./design-principles.md#abstraction-decision-test). Patterns specific to this architecture (repository, use case, DTO and mapper, composition root) are covered in [Clean Architecture](./clean-architecture.md), not here.

## Creational

These patterns control how objects are created.

| Pattern | Intent | Use when | Avoid when |
| --- | --- | --- | --- |
| Factory Method | One function or method decides which concrete type to create | The caller should depend on a port, not on the implementation | Only one implementation exists; call the constructor |
| Abstract Factory | Create a family of related objects that must be used together | Several products must stay consistent, such as one provider's client, signer, and parser | There is one product, or the products are independent |
| Builder | Build a complex object step by step | A constructor has many optional parts, or construction needs validation between steps | A dataclass or keyword arguments already read clearly |
| Singleton | Guarantee a single shared instance | Rarely. See below | Almost always |

### Singleton

Treat Singleton as a last resort. A global instance hides a dependency, makes tests share state, and makes order of initialization matter. Create the instance once at the composition root and pass it in. If a project already uses a module-level settings object, keep it read-only and set once at startup.

### Factory function returning a port

The handbook's factories return the port type, never the implementation ([FastAPI structure](../backend/fastapi-structure.md)). Callers stay unaware of which adapter is in use.

```python
def build_file_storage(settings: Settings) -> FileStorage:
    if settings.storage_backend == "s3":
        return S3FileStorage(settings.storage_bucket)
    return LocalFileStorage(settings.storage_path)
```

## Structural

These patterns control how objects and modules are composed.

| Pattern | Intent | Use when | Avoid when |
| --- | --- | --- | --- |
| Adapter | Convert one interface into the one the caller expects | Wrapping a database, SDK, or third-party API behind a port | The two interfaces already match |
| Decorator | Add behavior around an object without changing it | Cross-cutting concerns such as logging, caching, retry, or authorization | The extra behavior belongs to the core logic |
| Facade | Offer one simple entry point over several collaborators | A caller would otherwise coordinate many objects | It only forwards calls one to one; that is a pass-through wrapper |
| Proxy | Stand in for an object to control access to it | Lazy loading, access checks, or remote calls behind the same interface | A plain function call is enough |

## Behavioral

These patterns control how objects communicate and share responsibility.

| Pattern | Intent | Use when | Avoid when |
| --- | --- | --- | --- |
| Strategy | Swap interchangeable algorithms behind one interface | Two or more real variants exist and are chosen at runtime | One variant exists; pass a function instead of a class |
| Observer | Notify subscribers when something happens | Producers must not know their consumers, such as domain events | A direct call is clearer and there is one consumer |
| Command | Represent a request as an object | Queuing, retrying, undoing, or auditing operations | A function call is enough |
| Template Method | Fix the steps of an algorithm and let subclasses fill in some | Several variants share a stable sequence | Composition (pass in the varying step) would do |

### Strategy replacing a branch

Introduce a strategy when real variants exist and keep growing. Two cases that rarely change do not justify it.

```python
class ShippingCalculator(Protocol):
    def cost(self, order: Order) -> Decimal: ...


class FlatRateShipping:
    def cost(self, order: Order) -> Decimal:
        return Decimal("5.00")


class WeightBasedShipping:
    def cost(self, order: Order) -> Decimal:
        return order.total_weight * Decimal("0.80")
```

If only the flat rate exists today, keep a function and add the second variant when it is required.

## Patterns already in this architecture

Two patterns are already part of the layered structure. Recognizing them avoids adding a second one for the same job.

| Pattern | Where it appears |
| --- | --- |
| Adapter | Infrastructure repositories and HTTP clients implementing ports |
| Factory | Factories in the composition root that return port types, not implementations |

## Warning signs

- A pattern name appears in a class name (`UserRepositoryFactoryManager`) but not in the problem it solves.
- A factory, builder, or strategy exists with a single implementation.
- A Singleton holds mutable state shared across requests.
- A Decorator or Proxy changes the behavior callers rely on instead of adding to it, which breaks substitution.

More signs and fixes: [Design principles](./design-principles.md#warning-signs).
