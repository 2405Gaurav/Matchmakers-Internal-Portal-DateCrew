
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CustomerProfile
 * 
 */
export type CustomerProfile = $Result.DefaultSelection<Prisma.$CustomerProfilePayload>
/**
 * Model MatchNote
 * 
 */
export type MatchNote = $Result.DefaultSelection<Prisma.$MatchNotePayload>
/**
 * Model ActivityUpdate
 * 
 */
export type ActivityUpdate = $Result.DefaultSelection<Prisma.$ActivityUpdatePayload>
/**
 * Model MatchmakerAccount
 * 
 */
export type MatchmakerAccount = $Result.DefaultSelection<Prisma.$MatchmakerAccountPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more CustomerProfiles
 * const customerProfiles = await prisma.customerProfile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more CustomerProfiles
   * const customerProfiles = await prisma.customerProfile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.customerProfile`: Exposes CRUD operations for the **CustomerProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerProfiles
    * const customerProfiles = await prisma.customerProfile.findMany()
    * ```
    */
  get customerProfile(): Prisma.CustomerProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchNote`: Exposes CRUD operations for the **MatchNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchNotes
    * const matchNotes = await prisma.matchNote.findMany()
    * ```
    */
  get matchNote(): Prisma.MatchNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityUpdate`: Exposes CRUD operations for the **ActivityUpdate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityUpdates
    * const activityUpdates = await prisma.activityUpdate.findMany()
    * ```
    */
  get activityUpdate(): Prisma.ActivityUpdateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchmakerAccount`: Exposes CRUD operations for the **MatchmakerAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchmakerAccounts
    * const matchmakerAccounts = await prisma.matchmakerAccount.findMany()
    * ```
    */
  get matchmakerAccount(): Prisma.MatchmakerAccountDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CustomerProfile: 'CustomerProfile',
    MatchNote: 'MatchNote',
    ActivityUpdate: 'ActivityUpdate',
    MatchmakerAccount: 'MatchmakerAccount'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "customerProfile" | "matchNote" | "activityUpdate" | "matchmakerAccount"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CustomerProfile: {
        payload: Prisma.$CustomerProfilePayload<ExtArgs>
        fields: Prisma.CustomerProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload>
          }
          findFirst: {
            args: Prisma.CustomerProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload>
          }
          findMany: {
            args: Prisma.CustomerProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload>[]
          }
          create: {
            args: Prisma.CustomerProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload>
          }
          createMany: {
            args: Prisma.CustomerProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload>[]
          }
          delete: {
            args: Prisma.CustomerProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload>
          }
          update: {
            args: Prisma.CustomerProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload>
          }
          deleteMany: {
            args: Prisma.CustomerProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload>[]
          }
          upsert: {
            args: Prisma.CustomerProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerProfilePayload>
          }
          aggregate: {
            args: Prisma.CustomerProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerProfile>
          }
          groupBy: {
            args: Prisma.CustomerProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerProfileCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerProfileCountAggregateOutputType> | number
          }
        }
      }
      MatchNote: {
        payload: Prisma.$MatchNotePayload<ExtArgs>
        fields: Prisma.MatchNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload>
          }
          findFirst: {
            args: Prisma.MatchNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload>
          }
          findMany: {
            args: Prisma.MatchNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload>[]
          }
          create: {
            args: Prisma.MatchNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload>
          }
          createMany: {
            args: Prisma.MatchNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload>[]
          }
          delete: {
            args: Prisma.MatchNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload>
          }
          update: {
            args: Prisma.MatchNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload>
          }
          deleteMany: {
            args: Prisma.MatchNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload>[]
          }
          upsert: {
            args: Prisma.MatchNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchNotePayload>
          }
          aggregate: {
            args: Prisma.MatchNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchNote>
          }
          groupBy: {
            args: Prisma.MatchNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchNoteCountArgs<ExtArgs>
            result: $Utils.Optional<MatchNoteCountAggregateOutputType> | number
          }
        }
      }
      ActivityUpdate: {
        payload: Prisma.$ActivityUpdatePayload<ExtArgs>
        fields: Prisma.ActivityUpdateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityUpdateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityUpdateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload>
          }
          findFirst: {
            args: Prisma.ActivityUpdateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityUpdateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload>
          }
          findMany: {
            args: Prisma.ActivityUpdateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload>[]
          }
          create: {
            args: Prisma.ActivityUpdateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload>
          }
          createMany: {
            args: Prisma.ActivityUpdateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityUpdateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload>[]
          }
          delete: {
            args: Prisma.ActivityUpdateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload>
          }
          update: {
            args: Prisma.ActivityUpdateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload>
          }
          deleteMany: {
            args: Prisma.ActivityUpdateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpdateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityUpdatePayload>
          }
          aggregate: {
            args: Prisma.ActivityUpdateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityUpdate>
          }
          groupBy: {
            args: Prisma.ActivityUpdateGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityUpdateGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityUpdateCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityUpdateCountAggregateOutputType> | number
          }
        }
      }
      MatchmakerAccount: {
        payload: Prisma.$MatchmakerAccountPayload<ExtArgs>
        fields: Prisma.MatchmakerAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchmakerAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchmakerAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload>
          }
          findFirst: {
            args: Prisma.MatchmakerAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchmakerAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload>
          }
          findMany: {
            args: Prisma.MatchmakerAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload>[]
          }
          create: {
            args: Prisma.MatchmakerAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload>
          }
          createMany: {
            args: Prisma.MatchmakerAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchmakerAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload>[]
          }
          delete: {
            args: Prisma.MatchmakerAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload>
          }
          update: {
            args: Prisma.MatchmakerAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload>
          }
          deleteMany: {
            args: Prisma.MatchmakerAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchmakerAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchmakerAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload>[]
          }
          upsert: {
            args: Prisma.MatchmakerAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchmakerAccountPayload>
          }
          aggregate: {
            args: Prisma.MatchmakerAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchmakerAccount>
          }
          groupBy: {
            args: Prisma.MatchmakerAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchmakerAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchmakerAccountCountArgs<ExtArgs>
            result: $Utils.Optional<MatchmakerAccountCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    customerProfile?: CustomerProfileOmit
    matchNote?: MatchNoteOmit
    activityUpdate?: ActivityUpdateOmit
    matchmakerAccount?: MatchmakerAccountOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CustomerProfileCountOutputType
   */

  export type CustomerProfileCountOutputType = {
    notes: number
  }

  export type CustomerProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | CustomerProfileCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * CustomerProfileCountOutputType without action
   */
  export type CustomerProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfileCountOutputType
     */
    select?: CustomerProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerProfileCountOutputType without action
   */
  export type CustomerProfileCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchNoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CustomerProfile
   */

  export type AggregateCustomerProfile = {
    _count: CustomerProfileCountAggregateOutputType | null
    _avg: CustomerProfileAvgAggregateOutputType | null
    _sum: CustomerProfileSumAggregateOutputType | null
    _min: CustomerProfileMinAggregateOutputType | null
    _max: CustomerProfileMaxAggregateOutputType | null
  }

  export type CustomerProfileAvgAggregateOutputType = {
    age: number | null
    height: number | null
  }

  export type CustomerProfileSumAggregateOutputType = {
    age: number | null
    height: number | null
  }

  export type CustomerProfileMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    gender: string | null
    dob: string | null
    age: number | null
    height: number | null
    religion: string | null
    caste: string | null
    maritalStatus: string | null
    email: string | null
    phone: string | null
    country: string | null
    city: string | null
    status: string | null
    assignedMatchmaker: string | null
    lastActivity: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerProfileMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    gender: string | null
    dob: string | null
    age: number | null
    height: number | null
    religion: string | null
    caste: string | null
    maritalStatus: string | null
    email: string | null
    phone: string | null
    country: string | null
    city: string | null
    status: string | null
    assignedMatchmaker: string | null
    lastActivity: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerProfileCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    gender: number
    dob: number
    age: number
    height: number
    languages: number
    religion: number
    caste: number
    maritalStatus: number
    email: number
    phone: number
    country: number
    city: number
    education: number
    career: number
    preferences: number
    familyInfo: number
    status: number
    assignedMatchmaker: number
    lastActivity: number
    savedMatches: number
    sentMatches: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerProfileAvgAggregateInputType = {
    age?: true
    height?: true
  }

  export type CustomerProfileSumAggregateInputType = {
    age?: true
    height?: true
  }

  export type CustomerProfileMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    gender?: true
    dob?: true
    age?: true
    height?: true
    religion?: true
    caste?: true
    maritalStatus?: true
    email?: true
    phone?: true
    country?: true
    city?: true
    status?: true
    assignedMatchmaker?: true
    lastActivity?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerProfileMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    gender?: true
    dob?: true
    age?: true
    height?: true
    religion?: true
    caste?: true
    maritalStatus?: true
    email?: true
    phone?: true
    country?: true
    city?: true
    status?: true
    assignedMatchmaker?: true
    lastActivity?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerProfileCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    gender?: true
    dob?: true
    age?: true
    height?: true
    languages?: true
    religion?: true
    caste?: true
    maritalStatus?: true
    email?: true
    phone?: true
    country?: true
    city?: true
    education?: true
    career?: true
    preferences?: true
    familyInfo?: true
    status?: true
    assignedMatchmaker?: true
    lastActivity?: true
    savedMatches?: true
    sentMatches?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerProfile to aggregate.
     */
    where?: CustomerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerProfiles to fetch.
     */
    orderBy?: CustomerProfileOrderByWithRelationInput | CustomerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerProfiles
    **/
    _count?: true | CustomerProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerProfileMaxAggregateInputType
  }

  export type GetCustomerProfileAggregateType<T extends CustomerProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerProfile[P]>
      : GetScalarType<T[P], AggregateCustomerProfile[P]>
  }




  export type CustomerProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerProfileWhereInput
    orderBy?: CustomerProfileOrderByWithAggregationInput | CustomerProfileOrderByWithAggregationInput[]
    by: CustomerProfileScalarFieldEnum[] | CustomerProfileScalarFieldEnum
    having?: CustomerProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerProfileCountAggregateInputType | true
    _avg?: CustomerProfileAvgAggregateInputType
    _sum?: CustomerProfileSumAggregateInputType
    _min?: CustomerProfileMinAggregateInputType
    _max?: CustomerProfileMaxAggregateInputType
  }

  export type CustomerProfileGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    gender: string
    dob: string
    age: number
    height: number
    languages: JsonValue
    religion: string
    caste: string
    maritalStatus: string
    email: string
    phone: string
    country: string
    city: string
    education: JsonValue
    career: JsonValue
    preferences: JsonValue
    familyInfo: JsonValue
    status: string
    assignedMatchmaker: string
    lastActivity: string
    savedMatches: JsonValue
    sentMatches: JsonValue
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerProfileCountAggregateOutputType | null
    _avg: CustomerProfileAvgAggregateOutputType | null
    _sum: CustomerProfileSumAggregateOutputType | null
    _min: CustomerProfileMinAggregateOutputType | null
    _max: CustomerProfileMaxAggregateOutputType | null
  }

  type GetCustomerProfileGroupByPayload<T extends CustomerProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerProfileGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerProfileGroupByOutputType[P]>
        }
      >
    >


  export type CustomerProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    gender?: boolean
    dob?: boolean
    age?: boolean
    height?: boolean
    languages?: boolean
    religion?: boolean
    caste?: boolean
    maritalStatus?: boolean
    email?: boolean
    phone?: boolean
    country?: boolean
    city?: boolean
    education?: boolean
    career?: boolean
    preferences?: boolean
    familyInfo?: boolean
    status?: boolean
    assignedMatchmaker?: boolean
    lastActivity?: boolean
    savedMatches?: boolean
    sentMatches?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    notes?: boolean | CustomerProfile$notesArgs<ExtArgs>
    _count?: boolean | CustomerProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerProfile"]>

  export type CustomerProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    gender?: boolean
    dob?: boolean
    age?: boolean
    height?: boolean
    languages?: boolean
    religion?: boolean
    caste?: boolean
    maritalStatus?: boolean
    email?: boolean
    phone?: boolean
    country?: boolean
    city?: boolean
    education?: boolean
    career?: boolean
    preferences?: boolean
    familyInfo?: boolean
    status?: boolean
    assignedMatchmaker?: boolean
    lastActivity?: boolean
    savedMatches?: boolean
    sentMatches?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customerProfile"]>

  export type CustomerProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    gender?: boolean
    dob?: boolean
    age?: boolean
    height?: boolean
    languages?: boolean
    religion?: boolean
    caste?: boolean
    maritalStatus?: boolean
    email?: boolean
    phone?: boolean
    country?: boolean
    city?: boolean
    education?: boolean
    career?: boolean
    preferences?: boolean
    familyInfo?: boolean
    status?: boolean
    assignedMatchmaker?: boolean
    lastActivity?: boolean
    savedMatches?: boolean
    sentMatches?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customerProfile"]>

  export type CustomerProfileSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    gender?: boolean
    dob?: boolean
    age?: boolean
    height?: boolean
    languages?: boolean
    religion?: boolean
    caste?: boolean
    maritalStatus?: boolean
    email?: boolean
    phone?: boolean
    country?: boolean
    city?: boolean
    education?: boolean
    career?: boolean
    preferences?: boolean
    familyInfo?: boolean
    status?: boolean
    assignedMatchmaker?: boolean
    lastActivity?: boolean
    savedMatches?: boolean
    sentMatches?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "gender" | "dob" | "age" | "height" | "languages" | "religion" | "caste" | "maritalStatus" | "email" | "phone" | "country" | "city" | "education" | "career" | "preferences" | "familyInfo" | "status" | "assignedMatchmaker" | "lastActivity" | "savedMatches" | "sentMatches" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["customerProfile"]>
  export type CustomerProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | CustomerProfile$notesArgs<ExtArgs>
    _count?: boolean | CustomerProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerProfile"
    objects: {
      notes: Prisma.$MatchNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      gender: string
      dob: string
      age: number
      height: number
      languages: Prisma.JsonValue
      religion: string
      caste: string
      maritalStatus: string
      email: string
      phone: string
      country: string
      city: string
      education: Prisma.JsonValue
      career: Prisma.JsonValue
      preferences: Prisma.JsonValue
      familyInfo: Prisma.JsonValue
      status: string
      assignedMatchmaker: string
      lastActivity: string
      savedMatches: Prisma.JsonValue
      sentMatches: Prisma.JsonValue
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customerProfile"]>
    composites: {}
  }

  type CustomerProfileGetPayload<S extends boolean | null | undefined | CustomerProfileDefaultArgs> = $Result.GetResult<Prisma.$CustomerProfilePayload, S>

  type CustomerProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerProfileCountAggregateInputType | true
    }

  export interface CustomerProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerProfile'], meta: { name: 'CustomerProfile' } }
    /**
     * Find zero or one CustomerProfile that matches the filter.
     * @param {CustomerProfileFindUniqueArgs} args - Arguments to find a CustomerProfile
     * @example
     * // Get one CustomerProfile
     * const customerProfile = await prisma.customerProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerProfileFindUniqueArgs>(args: SelectSubset<T, CustomerProfileFindUniqueArgs<ExtArgs>>): Prisma__CustomerProfileClient<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerProfileFindUniqueOrThrowArgs} args - Arguments to find a CustomerProfile
     * @example
     * // Get one CustomerProfile
     * const customerProfile = await prisma.customerProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerProfileClient<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerProfileFindFirstArgs} args - Arguments to find a CustomerProfile
     * @example
     * // Get one CustomerProfile
     * const customerProfile = await prisma.customerProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerProfileFindFirstArgs>(args?: SelectSubset<T, CustomerProfileFindFirstArgs<ExtArgs>>): Prisma__CustomerProfileClient<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerProfileFindFirstOrThrowArgs} args - Arguments to find a CustomerProfile
     * @example
     * // Get one CustomerProfile
     * const customerProfile = await prisma.customerProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerProfileClient<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerProfiles
     * const customerProfiles = await prisma.customerProfile.findMany()
     * 
     * // Get first 10 CustomerProfiles
     * const customerProfiles = await prisma.customerProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerProfileWithIdOnly = await prisma.customerProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerProfileFindManyArgs>(args?: SelectSubset<T, CustomerProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerProfile.
     * @param {CustomerProfileCreateArgs} args - Arguments to create a CustomerProfile.
     * @example
     * // Create one CustomerProfile
     * const CustomerProfile = await prisma.customerProfile.create({
     *   data: {
     *     // ... data to create a CustomerProfile
     *   }
     * })
     * 
     */
    create<T extends CustomerProfileCreateArgs>(args: SelectSubset<T, CustomerProfileCreateArgs<ExtArgs>>): Prisma__CustomerProfileClient<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerProfiles.
     * @param {CustomerProfileCreateManyArgs} args - Arguments to create many CustomerProfiles.
     * @example
     * // Create many CustomerProfiles
     * const customerProfile = await prisma.customerProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerProfileCreateManyArgs>(args?: SelectSubset<T, CustomerProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerProfiles and returns the data saved in the database.
     * @param {CustomerProfileCreateManyAndReturnArgs} args - Arguments to create many CustomerProfiles.
     * @example
     * // Create many CustomerProfiles
     * const customerProfile = await prisma.customerProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerProfiles and only return the `id`
     * const customerProfileWithIdOnly = await prisma.customerProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerProfile.
     * @param {CustomerProfileDeleteArgs} args - Arguments to delete one CustomerProfile.
     * @example
     * // Delete one CustomerProfile
     * const CustomerProfile = await prisma.customerProfile.delete({
     *   where: {
     *     // ... filter to delete one CustomerProfile
     *   }
     * })
     * 
     */
    delete<T extends CustomerProfileDeleteArgs>(args: SelectSubset<T, CustomerProfileDeleteArgs<ExtArgs>>): Prisma__CustomerProfileClient<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerProfile.
     * @param {CustomerProfileUpdateArgs} args - Arguments to update one CustomerProfile.
     * @example
     * // Update one CustomerProfile
     * const customerProfile = await prisma.customerProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerProfileUpdateArgs>(args: SelectSubset<T, CustomerProfileUpdateArgs<ExtArgs>>): Prisma__CustomerProfileClient<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerProfiles.
     * @param {CustomerProfileDeleteManyArgs} args - Arguments to filter CustomerProfiles to delete.
     * @example
     * // Delete a few CustomerProfiles
     * const { count } = await prisma.customerProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerProfileDeleteManyArgs>(args?: SelectSubset<T, CustomerProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerProfiles
     * const customerProfile = await prisma.customerProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerProfileUpdateManyArgs>(args: SelectSubset<T, CustomerProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerProfiles and returns the data updated in the database.
     * @param {CustomerProfileUpdateManyAndReturnArgs} args - Arguments to update many CustomerProfiles.
     * @example
     * // Update many CustomerProfiles
     * const customerProfile = await prisma.customerProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerProfiles and only return the `id`
     * const customerProfileWithIdOnly = await prisma.customerProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerProfile.
     * @param {CustomerProfileUpsertArgs} args - Arguments to update or create a CustomerProfile.
     * @example
     * // Update or create a CustomerProfile
     * const customerProfile = await prisma.customerProfile.upsert({
     *   create: {
     *     // ... data to create a CustomerProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerProfile we want to update
     *   }
     * })
     */
    upsert<T extends CustomerProfileUpsertArgs>(args: SelectSubset<T, CustomerProfileUpsertArgs<ExtArgs>>): Prisma__CustomerProfileClient<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerProfileCountArgs} args - Arguments to filter CustomerProfiles to count.
     * @example
     * // Count the number of CustomerProfiles
     * const count = await prisma.customerProfile.count({
     *   where: {
     *     // ... the filter for the CustomerProfiles we want to count
     *   }
     * })
    **/
    count<T extends CustomerProfileCountArgs>(
      args?: Subset<T, CustomerProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerProfileAggregateArgs>(args: Subset<T, CustomerProfileAggregateArgs>): Prisma.PrismaPromise<GetCustomerProfileAggregateType<T>>

    /**
     * Group by CustomerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerProfileGroupByArgs['orderBy'] }
        : { orderBy?: CustomerProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerProfile model
   */
  readonly fields: CustomerProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notes<T extends CustomerProfile$notesArgs<ExtArgs> = {}>(args?: Subset<T, CustomerProfile$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomerProfile model
   */
  interface CustomerProfileFieldRefs {
    readonly id: FieldRef<"CustomerProfile", 'String'>
    readonly firstName: FieldRef<"CustomerProfile", 'String'>
    readonly lastName: FieldRef<"CustomerProfile", 'String'>
    readonly gender: FieldRef<"CustomerProfile", 'String'>
    readonly dob: FieldRef<"CustomerProfile", 'String'>
    readonly age: FieldRef<"CustomerProfile", 'Int'>
    readonly height: FieldRef<"CustomerProfile", 'Int'>
    readonly languages: FieldRef<"CustomerProfile", 'Json'>
    readonly religion: FieldRef<"CustomerProfile", 'String'>
    readonly caste: FieldRef<"CustomerProfile", 'String'>
    readonly maritalStatus: FieldRef<"CustomerProfile", 'String'>
    readonly email: FieldRef<"CustomerProfile", 'String'>
    readonly phone: FieldRef<"CustomerProfile", 'String'>
    readonly country: FieldRef<"CustomerProfile", 'String'>
    readonly city: FieldRef<"CustomerProfile", 'String'>
    readonly education: FieldRef<"CustomerProfile", 'Json'>
    readonly career: FieldRef<"CustomerProfile", 'Json'>
    readonly preferences: FieldRef<"CustomerProfile", 'Json'>
    readonly familyInfo: FieldRef<"CustomerProfile", 'Json'>
    readonly status: FieldRef<"CustomerProfile", 'String'>
    readonly assignedMatchmaker: FieldRef<"CustomerProfile", 'String'>
    readonly lastActivity: FieldRef<"CustomerProfile", 'String'>
    readonly savedMatches: FieldRef<"CustomerProfile", 'Json'>
    readonly sentMatches: FieldRef<"CustomerProfile", 'Json'>
    readonly imageUrl: FieldRef<"CustomerProfile", 'String'>
    readonly createdAt: FieldRef<"CustomerProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomerProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerProfile findUnique
   */
  export type CustomerProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CustomerProfile to fetch.
     */
    where: CustomerProfileWhereUniqueInput
  }

  /**
   * CustomerProfile findUniqueOrThrow
   */
  export type CustomerProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CustomerProfile to fetch.
     */
    where: CustomerProfileWhereUniqueInput
  }

  /**
   * CustomerProfile findFirst
   */
  export type CustomerProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CustomerProfile to fetch.
     */
    where?: CustomerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerProfiles to fetch.
     */
    orderBy?: CustomerProfileOrderByWithRelationInput | CustomerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerProfiles.
     */
    cursor?: CustomerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerProfiles.
     */
    distinct?: CustomerProfileScalarFieldEnum | CustomerProfileScalarFieldEnum[]
  }

  /**
   * CustomerProfile findFirstOrThrow
   */
  export type CustomerProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CustomerProfile to fetch.
     */
    where?: CustomerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerProfiles to fetch.
     */
    orderBy?: CustomerProfileOrderByWithRelationInput | CustomerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerProfiles.
     */
    cursor?: CustomerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerProfiles.
     */
    distinct?: CustomerProfileScalarFieldEnum | CustomerProfileScalarFieldEnum[]
  }

  /**
   * CustomerProfile findMany
   */
  export type CustomerProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CustomerProfiles to fetch.
     */
    where?: CustomerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerProfiles to fetch.
     */
    orderBy?: CustomerProfileOrderByWithRelationInput | CustomerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerProfiles.
     */
    cursor?: CustomerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerProfiles.
     */
    distinct?: CustomerProfileScalarFieldEnum | CustomerProfileScalarFieldEnum[]
  }

  /**
   * CustomerProfile create
   */
  export type CustomerProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerProfile.
     */
    data: XOR<CustomerProfileCreateInput, CustomerProfileUncheckedCreateInput>
  }

  /**
   * CustomerProfile createMany
   */
  export type CustomerProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerProfiles.
     */
    data: CustomerProfileCreateManyInput | CustomerProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerProfile createManyAndReturn
   */
  export type CustomerProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerProfiles.
     */
    data: CustomerProfileCreateManyInput | CustomerProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerProfile update
   */
  export type CustomerProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerProfile.
     */
    data: XOR<CustomerProfileUpdateInput, CustomerProfileUncheckedUpdateInput>
    /**
     * Choose, which CustomerProfile to update.
     */
    where: CustomerProfileWhereUniqueInput
  }

  /**
   * CustomerProfile updateMany
   */
  export type CustomerProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerProfiles.
     */
    data: XOR<CustomerProfileUpdateManyMutationInput, CustomerProfileUncheckedUpdateManyInput>
    /**
     * Filter which CustomerProfiles to update
     */
    where?: CustomerProfileWhereInput
    /**
     * Limit how many CustomerProfiles to update.
     */
    limit?: number
  }

  /**
   * CustomerProfile updateManyAndReturn
   */
  export type CustomerProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * The data used to update CustomerProfiles.
     */
    data: XOR<CustomerProfileUpdateManyMutationInput, CustomerProfileUncheckedUpdateManyInput>
    /**
     * Filter which CustomerProfiles to update
     */
    where?: CustomerProfileWhereInput
    /**
     * Limit how many CustomerProfiles to update.
     */
    limit?: number
  }

  /**
   * CustomerProfile upsert
   */
  export type CustomerProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerProfile to update in case it exists.
     */
    where: CustomerProfileWhereUniqueInput
    /**
     * In case the CustomerProfile found by the `where` argument doesn't exist, create a new CustomerProfile with this data.
     */
    create: XOR<CustomerProfileCreateInput, CustomerProfileUncheckedCreateInput>
    /**
     * In case the CustomerProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerProfileUpdateInput, CustomerProfileUncheckedUpdateInput>
  }

  /**
   * CustomerProfile delete
   */
  export type CustomerProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
    /**
     * Filter which CustomerProfile to delete.
     */
    where: CustomerProfileWhereUniqueInput
  }

  /**
   * CustomerProfile deleteMany
   */
  export type CustomerProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerProfiles to delete
     */
    where?: CustomerProfileWhereInput
    /**
     * Limit how many CustomerProfiles to delete.
     */
    limit?: number
  }

  /**
   * CustomerProfile.notes
   */
  export type CustomerProfile$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    where?: MatchNoteWhereInput
    orderBy?: MatchNoteOrderByWithRelationInput | MatchNoteOrderByWithRelationInput[]
    cursor?: MatchNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchNoteScalarFieldEnum | MatchNoteScalarFieldEnum[]
  }

  /**
   * CustomerProfile without action
   */
  export type CustomerProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerProfile
     */
    select?: CustomerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerProfile
     */
    omit?: CustomerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerProfileInclude<ExtArgs> | null
  }


  /**
   * Model MatchNote
   */

  export type AggregateMatchNote = {
    _count: MatchNoteCountAggregateOutputType | null
    _min: MatchNoteMinAggregateOutputType | null
    _max: MatchNoteMaxAggregateOutputType | null
  }

  export type MatchNoteMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    date: string | null
    author: string | null
    content: string | null
    isAiGenerated: boolean | null
  }

  export type MatchNoteMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    date: string | null
    author: string | null
    content: string | null
    isAiGenerated: boolean | null
  }

  export type MatchNoteCountAggregateOutputType = {
    id: number
    profileId: number
    date: number
    author: number
    content: number
    isAiGenerated: number
    _all: number
  }


  export type MatchNoteMinAggregateInputType = {
    id?: true
    profileId?: true
    date?: true
    author?: true
    content?: true
    isAiGenerated?: true
  }

  export type MatchNoteMaxAggregateInputType = {
    id?: true
    profileId?: true
    date?: true
    author?: true
    content?: true
    isAiGenerated?: true
  }

  export type MatchNoteCountAggregateInputType = {
    id?: true
    profileId?: true
    date?: true
    author?: true
    content?: true
    isAiGenerated?: true
    _all?: true
  }

  export type MatchNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchNote to aggregate.
     */
    where?: MatchNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchNotes to fetch.
     */
    orderBy?: MatchNoteOrderByWithRelationInput | MatchNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchNotes
    **/
    _count?: true | MatchNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchNoteMaxAggregateInputType
  }

  export type GetMatchNoteAggregateType<T extends MatchNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchNote[P]>
      : GetScalarType<T[P], AggregateMatchNote[P]>
  }




  export type MatchNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchNoteWhereInput
    orderBy?: MatchNoteOrderByWithAggregationInput | MatchNoteOrderByWithAggregationInput[]
    by: MatchNoteScalarFieldEnum[] | MatchNoteScalarFieldEnum
    having?: MatchNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchNoteCountAggregateInputType | true
    _min?: MatchNoteMinAggregateInputType
    _max?: MatchNoteMaxAggregateInputType
  }

  export type MatchNoteGroupByOutputType = {
    id: string
    profileId: string
    date: string
    author: string
    content: string
    isAiGenerated: boolean
    _count: MatchNoteCountAggregateOutputType | null
    _min: MatchNoteMinAggregateOutputType | null
    _max: MatchNoteMaxAggregateOutputType | null
  }

  type GetMatchNoteGroupByPayload<T extends MatchNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchNoteGroupByOutputType[P]>
            : GetScalarType<T[P], MatchNoteGroupByOutputType[P]>
        }
      >
    >


  export type MatchNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    date?: boolean
    author?: boolean
    content?: boolean
    isAiGenerated?: boolean
    profile?: boolean | CustomerProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchNote"]>

  export type MatchNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    date?: boolean
    author?: boolean
    content?: boolean
    isAiGenerated?: boolean
    profile?: boolean | CustomerProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchNote"]>

  export type MatchNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    date?: boolean
    author?: boolean
    content?: boolean
    isAiGenerated?: boolean
    profile?: boolean | CustomerProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchNote"]>

  export type MatchNoteSelectScalar = {
    id?: boolean
    profileId?: boolean
    date?: boolean
    author?: boolean
    content?: boolean
    isAiGenerated?: boolean
  }

  export type MatchNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "date" | "author" | "content" | "isAiGenerated", ExtArgs["result"]["matchNote"]>
  export type MatchNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | CustomerProfileDefaultArgs<ExtArgs>
  }
  export type MatchNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | CustomerProfileDefaultArgs<ExtArgs>
  }
  export type MatchNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | CustomerProfileDefaultArgs<ExtArgs>
  }

  export type $MatchNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchNote"
    objects: {
      profile: Prisma.$CustomerProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      date: string
      author: string
      content: string
      isAiGenerated: boolean
    }, ExtArgs["result"]["matchNote"]>
    composites: {}
  }

  type MatchNoteGetPayload<S extends boolean | null | undefined | MatchNoteDefaultArgs> = $Result.GetResult<Prisma.$MatchNotePayload, S>

  type MatchNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchNoteCountAggregateInputType | true
    }

  export interface MatchNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchNote'], meta: { name: 'MatchNote' } }
    /**
     * Find zero or one MatchNote that matches the filter.
     * @param {MatchNoteFindUniqueArgs} args - Arguments to find a MatchNote
     * @example
     * // Get one MatchNote
     * const matchNote = await prisma.matchNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchNoteFindUniqueArgs>(args: SelectSubset<T, MatchNoteFindUniqueArgs<ExtArgs>>): Prisma__MatchNoteClient<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchNoteFindUniqueOrThrowArgs} args - Arguments to find a MatchNote
     * @example
     * // Get one MatchNote
     * const matchNote = await prisma.matchNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchNoteClient<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchNoteFindFirstArgs} args - Arguments to find a MatchNote
     * @example
     * // Get one MatchNote
     * const matchNote = await prisma.matchNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchNoteFindFirstArgs>(args?: SelectSubset<T, MatchNoteFindFirstArgs<ExtArgs>>): Prisma__MatchNoteClient<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchNoteFindFirstOrThrowArgs} args - Arguments to find a MatchNote
     * @example
     * // Get one MatchNote
     * const matchNote = await prisma.matchNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchNoteClient<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchNotes
     * const matchNotes = await prisma.matchNote.findMany()
     * 
     * // Get first 10 MatchNotes
     * const matchNotes = await prisma.matchNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchNoteWithIdOnly = await prisma.matchNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchNoteFindManyArgs>(args?: SelectSubset<T, MatchNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchNote.
     * @param {MatchNoteCreateArgs} args - Arguments to create a MatchNote.
     * @example
     * // Create one MatchNote
     * const MatchNote = await prisma.matchNote.create({
     *   data: {
     *     // ... data to create a MatchNote
     *   }
     * })
     * 
     */
    create<T extends MatchNoteCreateArgs>(args: SelectSubset<T, MatchNoteCreateArgs<ExtArgs>>): Prisma__MatchNoteClient<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchNotes.
     * @param {MatchNoteCreateManyArgs} args - Arguments to create many MatchNotes.
     * @example
     * // Create many MatchNotes
     * const matchNote = await prisma.matchNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchNoteCreateManyArgs>(args?: SelectSubset<T, MatchNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchNotes and returns the data saved in the database.
     * @param {MatchNoteCreateManyAndReturnArgs} args - Arguments to create many MatchNotes.
     * @example
     * // Create many MatchNotes
     * const matchNote = await prisma.matchNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchNotes and only return the `id`
     * const matchNoteWithIdOnly = await prisma.matchNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchNote.
     * @param {MatchNoteDeleteArgs} args - Arguments to delete one MatchNote.
     * @example
     * // Delete one MatchNote
     * const MatchNote = await prisma.matchNote.delete({
     *   where: {
     *     // ... filter to delete one MatchNote
     *   }
     * })
     * 
     */
    delete<T extends MatchNoteDeleteArgs>(args: SelectSubset<T, MatchNoteDeleteArgs<ExtArgs>>): Prisma__MatchNoteClient<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchNote.
     * @param {MatchNoteUpdateArgs} args - Arguments to update one MatchNote.
     * @example
     * // Update one MatchNote
     * const matchNote = await prisma.matchNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchNoteUpdateArgs>(args: SelectSubset<T, MatchNoteUpdateArgs<ExtArgs>>): Prisma__MatchNoteClient<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchNotes.
     * @param {MatchNoteDeleteManyArgs} args - Arguments to filter MatchNotes to delete.
     * @example
     * // Delete a few MatchNotes
     * const { count } = await prisma.matchNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchNoteDeleteManyArgs>(args?: SelectSubset<T, MatchNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchNotes
     * const matchNote = await prisma.matchNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchNoteUpdateManyArgs>(args: SelectSubset<T, MatchNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchNotes and returns the data updated in the database.
     * @param {MatchNoteUpdateManyAndReturnArgs} args - Arguments to update many MatchNotes.
     * @example
     * // Update many MatchNotes
     * const matchNote = await prisma.matchNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchNotes and only return the `id`
     * const matchNoteWithIdOnly = await prisma.matchNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchNote.
     * @param {MatchNoteUpsertArgs} args - Arguments to update or create a MatchNote.
     * @example
     * // Update or create a MatchNote
     * const matchNote = await prisma.matchNote.upsert({
     *   create: {
     *     // ... data to create a MatchNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchNote we want to update
     *   }
     * })
     */
    upsert<T extends MatchNoteUpsertArgs>(args: SelectSubset<T, MatchNoteUpsertArgs<ExtArgs>>): Prisma__MatchNoteClient<$Result.GetResult<Prisma.$MatchNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchNoteCountArgs} args - Arguments to filter MatchNotes to count.
     * @example
     * // Count the number of MatchNotes
     * const count = await prisma.matchNote.count({
     *   where: {
     *     // ... the filter for the MatchNotes we want to count
     *   }
     * })
    **/
    count<T extends MatchNoteCountArgs>(
      args?: Subset<T, MatchNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchNoteAggregateArgs>(args: Subset<T, MatchNoteAggregateArgs>): Prisma.PrismaPromise<GetMatchNoteAggregateType<T>>

    /**
     * Group by MatchNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchNoteGroupByArgs['orderBy'] }
        : { orderBy?: MatchNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchNote model
   */
  readonly fields: MatchNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends CustomerProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerProfileDefaultArgs<ExtArgs>>): Prisma__CustomerProfileClient<$Result.GetResult<Prisma.$CustomerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchNote model
   */
  interface MatchNoteFieldRefs {
    readonly id: FieldRef<"MatchNote", 'String'>
    readonly profileId: FieldRef<"MatchNote", 'String'>
    readonly date: FieldRef<"MatchNote", 'String'>
    readonly author: FieldRef<"MatchNote", 'String'>
    readonly content: FieldRef<"MatchNote", 'String'>
    readonly isAiGenerated: FieldRef<"MatchNote", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * MatchNote findUnique
   */
  export type MatchNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    /**
     * Filter, which MatchNote to fetch.
     */
    where: MatchNoteWhereUniqueInput
  }

  /**
   * MatchNote findUniqueOrThrow
   */
  export type MatchNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    /**
     * Filter, which MatchNote to fetch.
     */
    where: MatchNoteWhereUniqueInput
  }

  /**
   * MatchNote findFirst
   */
  export type MatchNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    /**
     * Filter, which MatchNote to fetch.
     */
    where?: MatchNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchNotes to fetch.
     */
    orderBy?: MatchNoteOrderByWithRelationInput | MatchNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchNotes.
     */
    cursor?: MatchNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchNotes.
     */
    distinct?: MatchNoteScalarFieldEnum | MatchNoteScalarFieldEnum[]
  }

  /**
   * MatchNote findFirstOrThrow
   */
  export type MatchNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    /**
     * Filter, which MatchNote to fetch.
     */
    where?: MatchNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchNotes to fetch.
     */
    orderBy?: MatchNoteOrderByWithRelationInput | MatchNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchNotes.
     */
    cursor?: MatchNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchNotes.
     */
    distinct?: MatchNoteScalarFieldEnum | MatchNoteScalarFieldEnum[]
  }

  /**
   * MatchNote findMany
   */
  export type MatchNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    /**
     * Filter, which MatchNotes to fetch.
     */
    where?: MatchNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchNotes to fetch.
     */
    orderBy?: MatchNoteOrderByWithRelationInput | MatchNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchNotes.
     */
    cursor?: MatchNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchNotes.
     */
    distinct?: MatchNoteScalarFieldEnum | MatchNoteScalarFieldEnum[]
  }

  /**
   * MatchNote create
   */
  export type MatchNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a MatchNote.
     */
    data: XOR<MatchNoteCreateInput, MatchNoteUncheckedCreateInput>
  }

  /**
   * MatchNote createMany
   */
  export type MatchNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchNotes.
     */
    data: MatchNoteCreateManyInput | MatchNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchNote createManyAndReturn
   */
  export type MatchNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * The data used to create many MatchNotes.
     */
    data: MatchNoteCreateManyInput | MatchNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchNote update
   */
  export type MatchNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a MatchNote.
     */
    data: XOR<MatchNoteUpdateInput, MatchNoteUncheckedUpdateInput>
    /**
     * Choose, which MatchNote to update.
     */
    where: MatchNoteWhereUniqueInput
  }

  /**
   * MatchNote updateMany
   */
  export type MatchNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchNotes.
     */
    data: XOR<MatchNoteUpdateManyMutationInput, MatchNoteUncheckedUpdateManyInput>
    /**
     * Filter which MatchNotes to update
     */
    where?: MatchNoteWhereInput
    /**
     * Limit how many MatchNotes to update.
     */
    limit?: number
  }

  /**
   * MatchNote updateManyAndReturn
   */
  export type MatchNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * The data used to update MatchNotes.
     */
    data: XOR<MatchNoteUpdateManyMutationInput, MatchNoteUncheckedUpdateManyInput>
    /**
     * Filter which MatchNotes to update
     */
    where?: MatchNoteWhereInput
    /**
     * Limit how many MatchNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchNote upsert
   */
  export type MatchNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the MatchNote to update in case it exists.
     */
    where: MatchNoteWhereUniqueInput
    /**
     * In case the MatchNote found by the `where` argument doesn't exist, create a new MatchNote with this data.
     */
    create: XOR<MatchNoteCreateInput, MatchNoteUncheckedCreateInput>
    /**
     * In case the MatchNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchNoteUpdateInput, MatchNoteUncheckedUpdateInput>
  }

  /**
   * MatchNote delete
   */
  export type MatchNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
    /**
     * Filter which MatchNote to delete.
     */
    where: MatchNoteWhereUniqueInput
  }

  /**
   * MatchNote deleteMany
   */
  export type MatchNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchNotes to delete
     */
    where?: MatchNoteWhereInput
    /**
     * Limit how many MatchNotes to delete.
     */
    limit?: number
  }

  /**
   * MatchNote without action
   */
  export type MatchNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchNote
     */
    select?: MatchNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchNote
     */
    omit?: MatchNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchNoteInclude<ExtArgs> | null
  }


  /**
   * Model ActivityUpdate
   */

  export type AggregateActivityUpdate = {
    _count: ActivityUpdateCountAggregateOutputType | null
    _min: ActivityUpdateMinAggregateOutputType | null
    _max: ActivityUpdateMaxAggregateOutputType | null
  }

  export type ActivityUpdateMinAggregateOutputType = {
    id: string | null
    timestamp: string | null
    profileId: string | null
    profileName: string | null
    type: string | null
    message: string | null
    details: string | null
    createdAt: Date | null
  }

  export type ActivityUpdateMaxAggregateOutputType = {
    id: string | null
    timestamp: string | null
    profileId: string | null
    profileName: string | null
    type: string | null
    message: string | null
    details: string | null
    createdAt: Date | null
  }

  export type ActivityUpdateCountAggregateOutputType = {
    id: number
    timestamp: number
    profileId: number
    profileName: number
    type: number
    message: number
    details: number
    createdAt: number
    _all: number
  }


  export type ActivityUpdateMinAggregateInputType = {
    id?: true
    timestamp?: true
    profileId?: true
    profileName?: true
    type?: true
    message?: true
    details?: true
    createdAt?: true
  }

  export type ActivityUpdateMaxAggregateInputType = {
    id?: true
    timestamp?: true
    profileId?: true
    profileName?: true
    type?: true
    message?: true
    details?: true
    createdAt?: true
  }

  export type ActivityUpdateCountAggregateInputType = {
    id?: true
    timestamp?: true
    profileId?: true
    profileName?: true
    type?: true
    message?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityUpdateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityUpdate to aggregate.
     */
    where?: ActivityUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityUpdates to fetch.
     */
    orderBy?: ActivityUpdateOrderByWithRelationInput | ActivityUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityUpdates
    **/
    _count?: true | ActivityUpdateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityUpdateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityUpdateMaxAggregateInputType
  }

  export type GetActivityUpdateAggregateType<T extends ActivityUpdateAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityUpdate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityUpdate[P]>
      : GetScalarType<T[P], AggregateActivityUpdate[P]>
  }




  export type ActivityUpdateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityUpdateWhereInput
    orderBy?: ActivityUpdateOrderByWithAggregationInput | ActivityUpdateOrderByWithAggregationInput[]
    by: ActivityUpdateScalarFieldEnum[] | ActivityUpdateScalarFieldEnum
    having?: ActivityUpdateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityUpdateCountAggregateInputType | true
    _min?: ActivityUpdateMinAggregateInputType
    _max?: ActivityUpdateMaxAggregateInputType
  }

  export type ActivityUpdateGroupByOutputType = {
    id: string
    timestamp: string
    profileId: string
    profileName: string
    type: string
    message: string
    details: string | null
    createdAt: Date
    _count: ActivityUpdateCountAggregateOutputType | null
    _min: ActivityUpdateMinAggregateOutputType | null
    _max: ActivityUpdateMaxAggregateOutputType | null
  }

  type GetActivityUpdateGroupByPayload<T extends ActivityUpdateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityUpdateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityUpdateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityUpdateGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityUpdateGroupByOutputType[P]>
        }
      >
    >


  export type ActivityUpdateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    profileId?: boolean
    profileName?: boolean
    type?: boolean
    message?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityUpdate"]>

  export type ActivityUpdateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    profileId?: boolean
    profileName?: boolean
    type?: boolean
    message?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityUpdate"]>

  export type ActivityUpdateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    profileId?: boolean
    profileName?: boolean
    type?: boolean
    message?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityUpdate"]>

  export type ActivityUpdateSelectScalar = {
    id?: boolean
    timestamp?: boolean
    profileId?: boolean
    profileName?: boolean
    type?: boolean
    message?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type ActivityUpdateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "timestamp" | "profileId" | "profileName" | "type" | "message" | "details" | "createdAt", ExtArgs["result"]["activityUpdate"]>

  export type $ActivityUpdatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityUpdate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      timestamp: string
      profileId: string
      profileName: string
      type: string
      message: string
      details: string | null
      createdAt: Date
    }, ExtArgs["result"]["activityUpdate"]>
    composites: {}
  }

  type ActivityUpdateGetPayload<S extends boolean | null | undefined | ActivityUpdateDefaultArgs> = $Result.GetResult<Prisma.$ActivityUpdatePayload, S>

  type ActivityUpdateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityUpdateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityUpdateCountAggregateInputType | true
    }

  export interface ActivityUpdateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityUpdate'], meta: { name: 'ActivityUpdate' } }
    /**
     * Find zero or one ActivityUpdate that matches the filter.
     * @param {ActivityUpdateFindUniqueArgs} args - Arguments to find a ActivityUpdate
     * @example
     * // Get one ActivityUpdate
     * const activityUpdate = await prisma.activityUpdate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityUpdateFindUniqueArgs>(args: SelectSubset<T, ActivityUpdateFindUniqueArgs<ExtArgs>>): Prisma__ActivityUpdateClient<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityUpdate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityUpdateFindUniqueOrThrowArgs} args - Arguments to find a ActivityUpdate
     * @example
     * // Get one ActivityUpdate
     * const activityUpdate = await prisma.activityUpdate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityUpdateFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityUpdateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityUpdateClient<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityUpdate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateFindFirstArgs} args - Arguments to find a ActivityUpdate
     * @example
     * // Get one ActivityUpdate
     * const activityUpdate = await prisma.activityUpdate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityUpdateFindFirstArgs>(args?: SelectSubset<T, ActivityUpdateFindFirstArgs<ExtArgs>>): Prisma__ActivityUpdateClient<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityUpdate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateFindFirstOrThrowArgs} args - Arguments to find a ActivityUpdate
     * @example
     * // Get one ActivityUpdate
     * const activityUpdate = await prisma.activityUpdate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityUpdateFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityUpdateFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityUpdateClient<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityUpdates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityUpdates
     * const activityUpdates = await prisma.activityUpdate.findMany()
     * 
     * // Get first 10 ActivityUpdates
     * const activityUpdates = await prisma.activityUpdate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityUpdateWithIdOnly = await prisma.activityUpdate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityUpdateFindManyArgs>(args?: SelectSubset<T, ActivityUpdateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityUpdate.
     * @param {ActivityUpdateCreateArgs} args - Arguments to create a ActivityUpdate.
     * @example
     * // Create one ActivityUpdate
     * const ActivityUpdate = await prisma.activityUpdate.create({
     *   data: {
     *     // ... data to create a ActivityUpdate
     *   }
     * })
     * 
     */
    create<T extends ActivityUpdateCreateArgs>(args: SelectSubset<T, ActivityUpdateCreateArgs<ExtArgs>>): Prisma__ActivityUpdateClient<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityUpdates.
     * @param {ActivityUpdateCreateManyArgs} args - Arguments to create many ActivityUpdates.
     * @example
     * // Create many ActivityUpdates
     * const activityUpdate = await prisma.activityUpdate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityUpdateCreateManyArgs>(args?: SelectSubset<T, ActivityUpdateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityUpdates and returns the data saved in the database.
     * @param {ActivityUpdateCreateManyAndReturnArgs} args - Arguments to create many ActivityUpdates.
     * @example
     * // Create many ActivityUpdates
     * const activityUpdate = await prisma.activityUpdate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityUpdates and only return the `id`
     * const activityUpdateWithIdOnly = await prisma.activityUpdate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityUpdateCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityUpdateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityUpdate.
     * @param {ActivityUpdateDeleteArgs} args - Arguments to delete one ActivityUpdate.
     * @example
     * // Delete one ActivityUpdate
     * const ActivityUpdate = await prisma.activityUpdate.delete({
     *   where: {
     *     // ... filter to delete one ActivityUpdate
     *   }
     * })
     * 
     */
    delete<T extends ActivityUpdateDeleteArgs>(args: SelectSubset<T, ActivityUpdateDeleteArgs<ExtArgs>>): Prisma__ActivityUpdateClient<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityUpdate.
     * @param {ActivityUpdateUpdateArgs} args - Arguments to update one ActivityUpdate.
     * @example
     * // Update one ActivityUpdate
     * const activityUpdate = await prisma.activityUpdate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateUpdateArgs>(args: SelectSubset<T, ActivityUpdateUpdateArgs<ExtArgs>>): Prisma__ActivityUpdateClient<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityUpdates.
     * @param {ActivityUpdateDeleteManyArgs} args - Arguments to filter ActivityUpdates to delete.
     * @example
     * // Delete a few ActivityUpdates
     * const { count } = await prisma.activityUpdate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityUpdateDeleteManyArgs>(args?: SelectSubset<T, ActivityUpdateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityUpdates
     * const activityUpdate = await prisma.activityUpdate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityUpdates and returns the data updated in the database.
     * @param {ActivityUpdateUpdateManyAndReturnArgs} args - Arguments to update many ActivityUpdates.
     * @example
     * // Update many ActivityUpdates
     * const activityUpdate = await prisma.activityUpdate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityUpdates and only return the `id`
     * const activityUpdateWithIdOnly = await prisma.activityUpdate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityUpdate.
     * @param {ActivityUpdateUpsertArgs} args - Arguments to update or create a ActivityUpdate.
     * @example
     * // Update or create a ActivityUpdate
     * const activityUpdate = await prisma.activityUpdate.upsert({
     *   create: {
     *     // ... data to create a ActivityUpdate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityUpdate we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpdateUpsertArgs>(args: SelectSubset<T, ActivityUpdateUpsertArgs<ExtArgs>>): Prisma__ActivityUpdateClient<$Result.GetResult<Prisma.$ActivityUpdatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateCountArgs} args - Arguments to filter ActivityUpdates to count.
     * @example
     * // Count the number of ActivityUpdates
     * const count = await prisma.activityUpdate.count({
     *   where: {
     *     // ... the filter for the ActivityUpdates we want to count
     *   }
     * })
    **/
    count<T extends ActivityUpdateCountArgs>(
      args?: Subset<T, ActivityUpdateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityUpdateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityUpdateAggregateArgs>(args: Subset<T, ActivityUpdateAggregateArgs>): Prisma.PrismaPromise<GetActivityUpdateAggregateType<T>>

    /**
     * Group by ActivityUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityUpdateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityUpdateGroupByArgs['orderBy'] }
        : { orderBy?: ActivityUpdateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityUpdateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityUpdateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityUpdate model
   */
  readonly fields: ActivityUpdateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityUpdate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityUpdateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityUpdate model
   */
  interface ActivityUpdateFieldRefs {
    readonly id: FieldRef<"ActivityUpdate", 'String'>
    readonly timestamp: FieldRef<"ActivityUpdate", 'String'>
    readonly profileId: FieldRef<"ActivityUpdate", 'String'>
    readonly profileName: FieldRef<"ActivityUpdate", 'String'>
    readonly type: FieldRef<"ActivityUpdate", 'String'>
    readonly message: FieldRef<"ActivityUpdate", 'String'>
    readonly details: FieldRef<"ActivityUpdate", 'String'>
    readonly createdAt: FieldRef<"ActivityUpdate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityUpdate findUnique
   */
  export type ActivityUpdateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * Filter, which ActivityUpdate to fetch.
     */
    where: ActivityUpdateWhereUniqueInput
  }

  /**
   * ActivityUpdate findUniqueOrThrow
   */
  export type ActivityUpdateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * Filter, which ActivityUpdate to fetch.
     */
    where: ActivityUpdateWhereUniqueInput
  }

  /**
   * ActivityUpdate findFirst
   */
  export type ActivityUpdateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * Filter, which ActivityUpdate to fetch.
     */
    where?: ActivityUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityUpdates to fetch.
     */
    orderBy?: ActivityUpdateOrderByWithRelationInput | ActivityUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityUpdates.
     */
    cursor?: ActivityUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityUpdates.
     */
    distinct?: ActivityUpdateScalarFieldEnum | ActivityUpdateScalarFieldEnum[]
  }

  /**
   * ActivityUpdate findFirstOrThrow
   */
  export type ActivityUpdateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * Filter, which ActivityUpdate to fetch.
     */
    where?: ActivityUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityUpdates to fetch.
     */
    orderBy?: ActivityUpdateOrderByWithRelationInput | ActivityUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityUpdates.
     */
    cursor?: ActivityUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityUpdates.
     */
    distinct?: ActivityUpdateScalarFieldEnum | ActivityUpdateScalarFieldEnum[]
  }

  /**
   * ActivityUpdate findMany
   */
  export type ActivityUpdateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * Filter, which ActivityUpdates to fetch.
     */
    where?: ActivityUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityUpdates to fetch.
     */
    orderBy?: ActivityUpdateOrderByWithRelationInput | ActivityUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityUpdates.
     */
    cursor?: ActivityUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityUpdates.
     */
    distinct?: ActivityUpdateScalarFieldEnum | ActivityUpdateScalarFieldEnum[]
  }

  /**
   * ActivityUpdate create
   */
  export type ActivityUpdateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * The data needed to create a ActivityUpdate.
     */
    data: XOR<ActivityUpdateCreateInput, ActivityUpdateUncheckedCreateInput>
  }

  /**
   * ActivityUpdate createMany
   */
  export type ActivityUpdateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityUpdates.
     */
    data: ActivityUpdateCreateManyInput | ActivityUpdateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityUpdate createManyAndReturn
   */
  export type ActivityUpdateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityUpdates.
     */
    data: ActivityUpdateCreateManyInput | ActivityUpdateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityUpdate update
   */
  export type ActivityUpdateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * The data needed to update a ActivityUpdate.
     */
    data: XOR<ActivityUpdateUpdateInput, ActivityUpdateUncheckedUpdateInput>
    /**
     * Choose, which ActivityUpdate to update.
     */
    where: ActivityUpdateWhereUniqueInput
  }

  /**
   * ActivityUpdate updateMany
   */
  export type ActivityUpdateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityUpdates.
     */
    data: XOR<ActivityUpdateUpdateManyMutationInput, ActivityUpdateUncheckedUpdateManyInput>
    /**
     * Filter which ActivityUpdates to update
     */
    where?: ActivityUpdateWhereInput
    /**
     * Limit how many ActivityUpdates to update.
     */
    limit?: number
  }

  /**
   * ActivityUpdate updateManyAndReturn
   */
  export type ActivityUpdateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * The data used to update ActivityUpdates.
     */
    data: XOR<ActivityUpdateUpdateManyMutationInput, ActivityUpdateUncheckedUpdateManyInput>
    /**
     * Filter which ActivityUpdates to update
     */
    where?: ActivityUpdateWhereInput
    /**
     * Limit how many ActivityUpdates to update.
     */
    limit?: number
  }

  /**
   * ActivityUpdate upsert
   */
  export type ActivityUpdateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * The filter to search for the ActivityUpdate to update in case it exists.
     */
    where: ActivityUpdateWhereUniqueInput
    /**
     * In case the ActivityUpdate found by the `where` argument doesn't exist, create a new ActivityUpdate with this data.
     */
    create: XOR<ActivityUpdateCreateInput, ActivityUpdateUncheckedCreateInput>
    /**
     * In case the ActivityUpdate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateUpdateInput, ActivityUpdateUncheckedUpdateInput>
  }

  /**
   * ActivityUpdate delete
   */
  export type ActivityUpdateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
    /**
     * Filter which ActivityUpdate to delete.
     */
    where: ActivityUpdateWhereUniqueInput
  }

  /**
   * ActivityUpdate deleteMany
   */
  export type ActivityUpdateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityUpdates to delete
     */
    where?: ActivityUpdateWhereInput
    /**
     * Limit how many ActivityUpdates to delete.
     */
    limit?: number
  }

  /**
   * ActivityUpdate without action
   */
  export type ActivityUpdateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityUpdate
     */
    select?: ActivityUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityUpdate
     */
    omit?: ActivityUpdateOmit<ExtArgs> | null
  }


  /**
   * Model MatchmakerAccount
   */

  export type AggregateMatchmakerAccount = {
    _count: MatchmakerAccountCountAggregateOutputType | null
    _min: MatchmakerAccountMinAggregateOutputType | null
    _max: MatchmakerAccountMaxAggregateOutputType | null
  }

  export type MatchmakerAccountMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
  }

  export type MatchmakerAccountMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
  }

  export type MatchmakerAccountCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    createdAt: number
    _all: number
  }


  export type MatchmakerAccountMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
  }

  export type MatchmakerAccountMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
  }

  export type MatchmakerAccountCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type MatchmakerAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchmakerAccount to aggregate.
     */
    where?: MatchmakerAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchmakerAccounts to fetch.
     */
    orderBy?: MatchmakerAccountOrderByWithRelationInput | MatchmakerAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchmakerAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchmakerAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchmakerAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchmakerAccounts
    **/
    _count?: true | MatchmakerAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchmakerAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchmakerAccountMaxAggregateInputType
  }

  export type GetMatchmakerAccountAggregateType<T extends MatchmakerAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchmakerAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchmakerAccount[P]>
      : GetScalarType<T[P], AggregateMatchmakerAccount[P]>
  }




  export type MatchmakerAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchmakerAccountWhereInput
    orderBy?: MatchmakerAccountOrderByWithAggregationInput | MatchmakerAccountOrderByWithAggregationInput[]
    by: MatchmakerAccountScalarFieldEnum[] | MatchmakerAccountScalarFieldEnum
    having?: MatchmakerAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchmakerAccountCountAggregateInputType | true
    _min?: MatchmakerAccountMinAggregateInputType
    _max?: MatchmakerAccountMaxAggregateInputType
  }

  export type MatchmakerAccountGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    role: string
    createdAt: Date
    _count: MatchmakerAccountCountAggregateOutputType | null
    _min: MatchmakerAccountMinAggregateOutputType | null
    _max: MatchmakerAccountMaxAggregateOutputType | null
  }

  type GetMatchmakerAccountGroupByPayload<T extends MatchmakerAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchmakerAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchmakerAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchmakerAccountGroupByOutputType[P]>
            : GetScalarType<T[P], MatchmakerAccountGroupByOutputType[P]>
        }
      >
    >


  export type MatchmakerAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["matchmakerAccount"]>

  export type MatchmakerAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["matchmakerAccount"]>

  export type MatchmakerAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["matchmakerAccount"]>

  export type MatchmakerAccountSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type MatchmakerAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "createdAt", ExtArgs["result"]["matchmakerAccount"]>

  export type $MatchmakerAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchmakerAccount"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["matchmakerAccount"]>
    composites: {}
  }

  type MatchmakerAccountGetPayload<S extends boolean | null | undefined | MatchmakerAccountDefaultArgs> = $Result.GetResult<Prisma.$MatchmakerAccountPayload, S>

  type MatchmakerAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchmakerAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchmakerAccountCountAggregateInputType | true
    }

  export interface MatchmakerAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchmakerAccount'], meta: { name: 'MatchmakerAccount' } }
    /**
     * Find zero or one MatchmakerAccount that matches the filter.
     * @param {MatchmakerAccountFindUniqueArgs} args - Arguments to find a MatchmakerAccount
     * @example
     * // Get one MatchmakerAccount
     * const matchmakerAccount = await prisma.matchmakerAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchmakerAccountFindUniqueArgs>(args: SelectSubset<T, MatchmakerAccountFindUniqueArgs<ExtArgs>>): Prisma__MatchmakerAccountClient<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchmakerAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchmakerAccountFindUniqueOrThrowArgs} args - Arguments to find a MatchmakerAccount
     * @example
     * // Get one MatchmakerAccount
     * const matchmakerAccount = await prisma.matchmakerAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchmakerAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchmakerAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchmakerAccountClient<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchmakerAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchmakerAccountFindFirstArgs} args - Arguments to find a MatchmakerAccount
     * @example
     * // Get one MatchmakerAccount
     * const matchmakerAccount = await prisma.matchmakerAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchmakerAccountFindFirstArgs>(args?: SelectSubset<T, MatchmakerAccountFindFirstArgs<ExtArgs>>): Prisma__MatchmakerAccountClient<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchmakerAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchmakerAccountFindFirstOrThrowArgs} args - Arguments to find a MatchmakerAccount
     * @example
     * // Get one MatchmakerAccount
     * const matchmakerAccount = await prisma.matchmakerAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchmakerAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchmakerAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchmakerAccountClient<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchmakerAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchmakerAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchmakerAccounts
     * const matchmakerAccounts = await prisma.matchmakerAccount.findMany()
     * 
     * // Get first 10 MatchmakerAccounts
     * const matchmakerAccounts = await prisma.matchmakerAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchmakerAccountWithIdOnly = await prisma.matchmakerAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchmakerAccountFindManyArgs>(args?: SelectSubset<T, MatchmakerAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchmakerAccount.
     * @param {MatchmakerAccountCreateArgs} args - Arguments to create a MatchmakerAccount.
     * @example
     * // Create one MatchmakerAccount
     * const MatchmakerAccount = await prisma.matchmakerAccount.create({
     *   data: {
     *     // ... data to create a MatchmakerAccount
     *   }
     * })
     * 
     */
    create<T extends MatchmakerAccountCreateArgs>(args: SelectSubset<T, MatchmakerAccountCreateArgs<ExtArgs>>): Prisma__MatchmakerAccountClient<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchmakerAccounts.
     * @param {MatchmakerAccountCreateManyArgs} args - Arguments to create many MatchmakerAccounts.
     * @example
     * // Create many MatchmakerAccounts
     * const matchmakerAccount = await prisma.matchmakerAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchmakerAccountCreateManyArgs>(args?: SelectSubset<T, MatchmakerAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchmakerAccounts and returns the data saved in the database.
     * @param {MatchmakerAccountCreateManyAndReturnArgs} args - Arguments to create many MatchmakerAccounts.
     * @example
     * // Create many MatchmakerAccounts
     * const matchmakerAccount = await prisma.matchmakerAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchmakerAccounts and only return the `id`
     * const matchmakerAccountWithIdOnly = await prisma.matchmakerAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchmakerAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchmakerAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchmakerAccount.
     * @param {MatchmakerAccountDeleteArgs} args - Arguments to delete one MatchmakerAccount.
     * @example
     * // Delete one MatchmakerAccount
     * const MatchmakerAccount = await prisma.matchmakerAccount.delete({
     *   where: {
     *     // ... filter to delete one MatchmakerAccount
     *   }
     * })
     * 
     */
    delete<T extends MatchmakerAccountDeleteArgs>(args: SelectSubset<T, MatchmakerAccountDeleteArgs<ExtArgs>>): Prisma__MatchmakerAccountClient<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchmakerAccount.
     * @param {MatchmakerAccountUpdateArgs} args - Arguments to update one MatchmakerAccount.
     * @example
     * // Update one MatchmakerAccount
     * const matchmakerAccount = await prisma.matchmakerAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchmakerAccountUpdateArgs>(args: SelectSubset<T, MatchmakerAccountUpdateArgs<ExtArgs>>): Prisma__MatchmakerAccountClient<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchmakerAccounts.
     * @param {MatchmakerAccountDeleteManyArgs} args - Arguments to filter MatchmakerAccounts to delete.
     * @example
     * // Delete a few MatchmakerAccounts
     * const { count } = await prisma.matchmakerAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchmakerAccountDeleteManyArgs>(args?: SelectSubset<T, MatchmakerAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchmakerAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchmakerAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchmakerAccounts
     * const matchmakerAccount = await prisma.matchmakerAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchmakerAccountUpdateManyArgs>(args: SelectSubset<T, MatchmakerAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchmakerAccounts and returns the data updated in the database.
     * @param {MatchmakerAccountUpdateManyAndReturnArgs} args - Arguments to update many MatchmakerAccounts.
     * @example
     * // Update many MatchmakerAccounts
     * const matchmakerAccount = await prisma.matchmakerAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchmakerAccounts and only return the `id`
     * const matchmakerAccountWithIdOnly = await prisma.matchmakerAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchmakerAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchmakerAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchmakerAccount.
     * @param {MatchmakerAccountUpsertArgs} args - Arguments to update or create a MatchmakerAccount.
     * @example
     * // Update or create a MatchmakerAccount
     * const matchmakerAccount = await prisma.matchmakerAccount.upsert({
     *   create: {
     *     // ... data to create a MatchmakerAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchmakerAccount we want to update
     *   }
     * })
     */
    upsert<T extends MatchmakerAccountUpsertArgs>(args: SelectSubset<T, MatchmakerAccountUpsertArgs<ExtArgs>>): Prisma__MatchmakerAccountClient<$Result.GetResult<Prisma.$MatchmakerAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchmakerAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchmakerAccountCountArgs} args - Arguments to filter MatchmakerAccounts to count.
     * @example
     * // Count the number of MatchmakerAccounts
     * const count = await prisma.matchmakerAccount.count({
     *   where: {
     *     // ... the filter for the MatchmakerAccounts we want to count
     *   }
     * })
    **/
    count<T extends MatchmakerAccountCountArgs>(
      args?: Subset<T, MatchmakerAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchmakerAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchmakerAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchmakerAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchmakerAccountAggregateArgs>(args: Subset<T, MatchmakerAccountAggregateArgs>): Prisma.PrismaPromise<GetMatchmakerAccountAggregateType<T>>

    /**
     * Group by MatchmakerAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchmakerAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchmakerAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchmakerAccountGroupByArgs['orderBy'] }
        : { orderBy?: MatchmakerAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchmakerAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchmakerAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchmakerAccount model
   */
  readonly fields: MatchmakerAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchmakerAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchmakerAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchmakerAccount model
   */
  interface MatchmakerAccountFieldRefs {
    readonly id: FieldRef<"MatchmakerAccount", 'String'>
    readonly email: FieldRef<"MatchmakerAccount", 'String'>
    readonly password: FieldRef<"MatchmakerAccount", 'String'>
    readonly name: FieldRef<"MatchmakerAccount", 'String'>
    readonly role: FieldRef<"MatchmakerAccount", 'String'>
    readonly createdAt: FieldRef<"MatchmakerAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchmakerAccount findUnique
   */
  export type MatchmakerAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * Filter, which MatchmakerAccount to fetch.
     */
    where: MatchmakerAccountWhereUniqueInput
  }

  /**
   * MatchmakerAccount findUniqueOrThrow
   */
  export type MatchmakerAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * Filter, which MatchmakerAccount to fetch.
     */
    where: MatchmakerAccountWhereUniqueInput
  }

  /**
   * MatchmakerAccount findFirst
   */
  export type MatchmakerAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * Filter, which MatchmakerAccount to fetch.
     */
    where?: MatchmakerAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchmakerAccounts to fetch.
     */
    orderBy?: MatchmakerAccountOrderByWithRelationInput | MatchmakerAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchmakerAccounts.
     */
    cursor?: MatchmakerAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchmakerAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchmakerAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchmakerAccounts.
     */
    distinct?: MatchmakerAccountScalarFieldEnum | MatchmakerAccountScalarFieldEnum[]
  }

  /**
   * MatchmakerAccount findFirstOrThrow
   */
  export type MatchmakerAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * Filter, which MatchmakerAccount to fetch.
     */
    where?: MatchmakerAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchmakerAccounts to fetch.
     */
    orderBy?: MatchmakerAccountOrderByWithRelationInput | MatchmakerAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchmakerAccounts.
     */
    cursor?: MatchmakerAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchmakerAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchmakerAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchmakerAccounts.
     */
    distinct?: MatchmakerAccountScalarFieldEnum | MatchmakerAccountScalarFieldEnum[]
  }

  /**
   * MatchmakerAccount findMany
   */
  export type MatchmakerAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * Filter, which MatchmakerAccounts to fetch.
     */
    where?: MatchmakerAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchmakerAccounts to fetch.
     */
    orderBy?: MatchmakerAccountOrderByWithRelationInput | MatchmakerAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchmakerAccounts.
     */
    cursor?: MatchmakerAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchmakerAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchmakerAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchmakerAccounts.
     */
    distinct?: MatchmakerAccountScalarFieldEnum | MatchmakerAccountScalarFieldEnum[]
  }

  /**
   * MatchmakerAccount create
   */
  export type MatchmakerAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * The data needed to create a MatchmakerAccount.
     */
    data: XOR<MatchmakerAccountCreateInput, MatchmakerAccountUncheckedCreateInput>
  }

  /**
   * MatchmakerAccount createMany
   */
  export type MatchmakerAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchmakerAccounts.
     */
    data: MatchmakerAccountCreateManyInput | MatchmakerAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchmakerAccount createManyAndReturn
   */
  export type MatchmakerAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * The data used to create many MatchmakerAccounts.
     */
    data: MatchmakerAccountCreateManyInput | MatchmakerAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchmakerAccount update
   */
  export type MatchmakerAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * The data needed to update a MatchmakerAccount.
     */
    data: XOR<MatchmakerAccountUpdateInput, MatchmakerAccountUncheckedUpdateInput>
    /**
     * Choose, which MatchmakerAccount to update.
     */
    where: MatchmakerAccountWhereUniqueInput
  }

  /**
   * MatchmakerAccount updateMany
   */
  export type MatchmakerAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchmakerAccounts.
     */
    data: XOR<MatchmakerAccountUpdateManyMutationInput, MatchmakerAccountUncheckedUpdateManyInput>
    /**
     * Filter which MatchmakerAccounts to update
     */
    where?: MatchmakerAccountWhereInput
    /**
     * Limit how many MatchmakerAccounts to update.
     */
    limit?: number
  }

  /**
   * MatchmakerAccount updateManyAndReturn
   */
  export type MatchmakerAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * The data used to update MatchmakerAccounts.
     */
    data: XOR<MatchmakerAccountUpdateManyMutationInput, MatchmakerAccountUncheckedUpdateManyInput>
    /**
     * Filter which MatchmakerAccounts to update
     */
    where?: MatchmakerAccountWhereInput
    /**
     * Limit how many MatchmakerAccounts to update.
     */
    limit?: number
  }

  /**
   * MatchmakerAccount upsert
   */
  export type MatchmakerAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * The filter to search for the MatchmakerAccount to update in case it exists.
     */
    where: MatchmakerAccountWhereUniqueInput
    /**
     * In case the MatchmakerAccount found by the `where` argument doesn't exist, create a new MatchmakerAccount with this data.
     */
    create: XOR<MatchmakerAccountCreateInput, MatchmakerAccountUncheckedCreateInput>
    /**
     * In case the MatchmakerAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchmakerAccountUpdateInput, MatchmakerAccountUncheckedUpdateInput>
  }

  /**
   * MatchmakerAccount delete
   */
  export type MatchmakerAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
    /**
     * Filter which MatchmakerAccount to delete.
     */
    where: MatchmakerAccountWhereUniqueInput
  }

  /**
   * MatchmakerAccount deleteMany
   */
  export type MatchmakerAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchmakerAccounts to delete
     */
    where?: MatchmakerAccountWhereInput
    /**
     * Limit how many MatchmakerAccounts to delete.
     */
    limit?: number
  }

  /**
   * MatchmakerAccount without action
   */
  export type MatchmakerAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchmakerAccount
     */
    select?: MatchmakerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchmakerAccount
     */
    omit?: MatchmakerAccountOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CustomerProfileScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    gender: 'gender',
    dob: 'dob',
    age: 'age',
    height: 'height',
    languages: 'languages',
    religion: 'religion',
    caste: 'caste',
    maritalStatus: 'maritalStatus',
    email: 'email',
    phone: 'phone',
    country: 'country',
    city: 'city',
    education: 'education',
    career: 'career',
    preferences: 'preferences',
    familyInfo: 'familyInfo',
    status: 'status',
    assignedMatchmaker: 'assignedMatchmaker',
    lastActivity: 'lastActivity',
    savedMatches: 'savedMatches',
    sentMatches: 'sentMatches',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerProfileScalarFieldEnum = (typeof CustomerProfileScalarFieldEnum)[keyof typeof CustomerProfileScalarFieldEnum]


  export const MatchNoteScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    date: 'date',
    author: 'author',
    content: 'content',
    isAiGenerated: 'isAiGenerated'
  };

  export type MatchNoteScalarFieldEnum = (typeof MatchNoteScalarFieldEnum)[keyof typeof MatchNoteScalarFieldEnum]


  export const ActivityUpdateScalarFieldEnum: {
    id: 'id',
    timestamp: 'timestamp',
    profileId: 'profileId',
    profileName: 'profileName',
    type: 'type',
    message: 'message',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type ActivityUpdateScalarFieldEnum = (typeof ActivityUpdateScalarFieldEnum)[keyof typeof ActivityUpdateScalarFieldEnum]


  export const MatchmakerAccountScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type MatchmakerAccountScalarFieldEnum = (typeof MatchmakerAccountScalarFieldEnum)[keyof typeof MatchmakerAccountScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CustomerProfileWhereInput = {
    AND?: CustomerProfileWhereInput | CustomerProfileWhereInput[]
    OR?: CustomerProfileWhereInput[]
    NOT?: CustomerProfileWhereInput | CustomerProfileWhereInput[]
    id?: StringFilter<"CustomerProfile"> | string
    firstName?: StringFilter<"CustomerProfile"> | string
    lastName?: StringFilter<"CustomerProfile"> | string
    gender?: StringFilter<"CustomerProfile"> | string
    dob?: StringFilter<"CustomerProfile"> | string
    age?: IntFilter<"CustomerProfile"> | number
    height?: IntFilter<"CustomerProfile"> | number
    languages?: JsonFilter<"CustomerProfile">
    religion?: StringFilter<"CustomerProfile"> | string
    caste?: StringFilter<"CustomerProfile"> | string
    maritalStatus?: StringFilter<"CustomerProfile"> | string
    email?: StringFilter<"CustomerProfile"> | string
    phone?: StringFilter<"CustomerProfile"> | string
    country?: StringFilter<"CustomerProfile"> | string
    city?: StringFilter<"CustomerProfile"> | string
    education?: JsonFilter<"CustomerProfile">
    career?: JsonFilter<"CustomerProfile">
    preferences?: JsonFilter<"CustomerProfile">
    familyInfo?: JsonFilter<"CustomerProfile">
    status?: StringFilter<"CustomerProfile"> | string
    assignedMatchmaker?: StringFilter<"CustomerProfile"> | string
    lastActivity?: StringFilter<"CustomerProfile"> | string
    savedMatches?: JsonFilter<"CustomerProfile">
    sentMatches?: JsonFilter<"CustomerProfile">
    imageUrl?: StringNullableFilter<"CustomerProfile"> | string | null
    createdAt?: DateTimeFilter<"CustomerProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerProfile"> | Date | string
    notes?: MatchNoteListRelationFilter
  }

  export type CustomerProfileOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    languages?: SortOrder
    religion?: SortOrder
    caste?: SortOrder
    maritalStatus?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    country?: SortOrder
    city?: SortOrder
    education?: SortOrder
    career?: SortOrder
    preferences?: SortOrder
    familyInfo?: SortOrder
    status?: SortOrder
    assignedMatchmaker?: SortOrder
    lastActivity?: SortOrder
    savedMatches?: SortOrder
    sentMatches?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    notes?: MatchNoteOrderByRelationAggregateInput
  }

  export type CustomerProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CustomerProfileWhereInput | CustomerProfileWhereInput[]
    OR?: CustomerProfileWhereInput[]
    NOT?: CustomerProfileWhereInput | CustomerProfileWhereInput[]
    firstName?: StringFilter<"CustomerProfile"> | string
    lastName?: StringFilter<"CustomerProfile"> | string
    gender?: StringFilter<"CustomerProfile"> | string
    dob?: StringFilter<"CustomerProfile"> | string
    age?: IntFilter<"CustomerProfile"> | number
    height?: IntFilter<"CustomerProfile"> | number
    languages?: JsonFilter<"CustomerProfile">
    religion?: StringFilter<"CustomerProfile"> | string
    caste?: StringFilter<"CustomerProfile"> | string
    maritalStatus?: StringFilter<"CustomerProfile"> | string
    phone?: StringFilter<"CustomerProfile"> | string
    country?: StringFilter<"CustomerProfile"> | string
    city?: StringFilter<"CustomerProfile"> | string
    education?: JsonFilter<"CustomerProfile">
    career?: JsonFilter<"CustomerProfile">
    preferences?: JsonFilter<"CustomerProfile">
    familyInfo?: JsonFilter<"CustomerProfile">
    status?: StringFilter<"CustomerProfile"> | string
    assignedMatchmaker?: StringFilter<"CustomerProfile"> | string
    lastActivity?: StringFilter<"CustomerProfile"> | string
    savedMatches?: JsonFilter<"CustomerProfile">
    sentMatches?: JsonFilter<"CustomerProfile">
    imageUrl?: StringNullableFilter<"CustomerProfile"> | string | null
    createdAt?: DateTimeFilter<"CustomerProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerProfile"> | Date | string
    notes?: MatchNoteListRelationFilter
  }, "id" | "email">

  export type CustomerProfileOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    languages?: SortOrder
    religion?: SortOrder
    caste?: SortOrder
    maritalStatus?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    country?: SortOrder
    city?: SortOrder
    education?: SortOrder
    career?: SortOrder
    preferences?: SortOrder
    familyInfo?: SortOrder
    status?: SortOrder
    assignedMatchmaker?: SortOrder
    lastActivity?: SortOrder
    savedMatches?: SortOrder
    sentMatches?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerProfileCountOrderByAggregateInput
    _avg?: CustomerProfileAvgOrderByAggregateInput
    _max?: CustomerProfileMaxOrderByAggregateInput
    _min?: CustomerProfileMinOrderByAggregateInput
    _sum?: CustomerProfileSumOrderByAggregateInput
  }

  export type CustomerProfileScalarWhereWithAggregatesInput = {
    AND?: CustomerProfileScalarWhereWithAggregatesInput | CustomerProfileScalarWhereWithAggregatesInput[]
    OR?: CustomerProfileScalarWhereWithAggregatesInput[]
    NOT?: CustomerProfileScalarWhereWithAggregatesInput | CustomerProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerProfile"> | string
    firstName?: StringWithAggregatesFilter<"CustomerProfile"> | string
    lastName?: StringWithAggregatesFilter<"CustomerProfile"> | string
    gender?: StringWithAggregatesFilter<"CustomerProfile"> | string
    dob?: StringWithAggregatesFilter<"CustomerProfile"> | string
    age?: IntWithAggregatesFilter<"CustomerProfile"> | number
    height?: IntWithAggregatesFilter<"CustomerProfile"> | number
    languages?: JsonWithAggregatesFilter<"CustomerProfile">
    religion?: StringWithAggregatesFilter<"CustomerProfile"> | string
    caste?: StringWithAggregatesFilter<"CustomerProfile"> | string
    maritalStatus?: StringWithAggregatesFilter<"CustomerProfile"> | string
    email?: StringWithAggregatesFilter<"CustomerProfile"> | string
    phone?: StringWithAggregatesFilter<"CustomerProfile"> | string
    country?: StringWithAggregatesFilter<"CustomerProfile"> | string
    city?: StringWithAggregatesFilter<"CustomerProfile"> | string
    education?: JsonWithAggregatesFilter<"CustomerProfile">
    career?: JsonWithAggregatesFilter<"CustomerProfile">
    preferences?: JsonWithAggregatesFilter<"CustomerProfile">
    familyInfo?: JsonWithAggregatesFilter<"CustomerProfile">
    status?: StringWithAggregatesFilter<"CustomerProfile"> | string
    assignedMatchmaker?: StringWithAggregatesFilter<"CustomerProfile"> | string
    lastActivity?: StringWithAggregatesFilter<"CustomerProfile"> | string
    savedMatches?: JsonWithAggregatesFilter<"CustomerProfile">
    sentMatches?: JsonWithAggregatesFilter<"CustomerProfile">
    imageUrl?: StringNullableWithAggregatesFilter<"CustomerProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CustomerProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomerProfile"> | Date | string
  }

  export type MatchNoteWhereInput = {
    AND?: MatchNoteWhereInput | MatchNoteWhereInput[]
    OR?: MatchNoteWhereInput[]
    NOT?: MatchNoteWhereInput | MatchNoteWhereInput[]
    id?: StringFilter<"MatchNote"> | string
    profileId?: StringFilter<"MatchNote"> | string
    date?: StringFilter<"MatchNote"> | string
    author?: StringFilter<"MatchNote"> | string
    content?: StringFilter<"MatchNote"> | string
    isAiGenerated?: BoolFilter<"MatchNote"> | boolean
    profile?: XOR<CustomerProfileScalarRelationFilter, CustomerProfileWhereInput>
  }

  export type MatchNoteOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    date?: SortOrder
    author?: SortOrder
    content?: SortOrder
    isAiGenerated?: SortOrder
    profile?: CustomerProfileOrderByWithRelationInput
  }

  export type MatchNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatchNoteWhereInput | MatchNoteWhereInput[]
    OR?: MatchNoteWhereInput[]
    NOT?: MatchNoteWhereInput | MatchNoteWhereInput[]
    profileId?: StringFilter<"MatchNote"> | string
    date?: StringFilter<"MatchNote"> | string
    author?: StringFilter<"MatchNote"> | string
    content?: StringFilter<"MatchNote"> | string
    isAiGenerated?: BoolFilter<"MatchNote"> | boolean
    profile?: XOR<CustomerProfileScalarRelationFilter, CustomerProfileWhereInput>
  }, "id">

  export type MatchNoteOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    date?: SortOrder
    author?: SortOrder
    content?: SortOrder
    isAiGenerated?: SortOrder
    _count?: MatchNoteCountOrderByAggregateInput
    _max?: MatchNoteMaxOrderByAggregateInput
    _min?: MatchNoteMinOrderByAggregateInput
  }

  export type MatchNoteScalarWhereWithAggregatesInput = {
    AND?: MatchNoteScalarWhereWithAggregatesInput | MatchNoteScalarWhereWithAggregatesInput[]
    OR?: MatchNoteScalarWhereWithAggregatesInput[]
    NOT?: MatchNoteScalarWhereWithAggregatesInput | MatchNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchNote"> | string
    profileId?: StringWithAggregatesFilter<"MatchNote"> | string
    date?: StringWithAggregatesFilter<"MatchNote"> | string
    author?: StringWithAggregatesFilter<"MatchNote"> | string
    content?: StringWithAggregatesFilter<"MatchNote"> | string
    isAiGenerated?: BoolWithAggregatesFilter<"MatchNote"> | boolean
  }

  export type ActivityUpdateWhereInput = {
    AND?: ActivityUpdateWhereInput | ActivityUpdateWhereInput[]
    OR?: ActivityUpdateWhereInput[]
    NOT?: ActivityUpdateWhereInput | ActivityUpdateWhereInput[]
    id?: StringFilter<"ActivityUpdate"> | string
    timestamp?: StringFilter<"ActivityUpdate"> | string
    profileId?: StringFilter<"ActivityUpdate"> | string
    profileName?: StringFilter<"ActivityUpdate"> | string
    type?: StringFilter<"ActivityUpdate"> | string
    message?: StringFilter<"ActivityUpdate"> | string
    details?: StringNullableFilter<"ActivityUpdate"> | string | null
    createdAt?: DateTimeFilter<"ActivityUpdate"> | Date | string
  }

  export type ActivityUpdateOrderByWithRelationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    profileId?: SortOrder
    profileName?: SortOrder
    type?: SortOrder
    message?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ActivityUpdateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityUpdateWhereInput | ActivityUpdateWhereInput[]
    OR?: ActivityUpdateWhereInput[]
    NOT?: ActivityUpdateWhereInput | ActivityUpdateWhereInput[]
    timestamp?: StringFilter<"ActivityUpdate"> | string
    profileId?: StringFilter<"ActivityUpdate"> | string
    profileName?: StringFilter<"ActivityUpdate"> | string
    type?: StringFilter<"ActivityUpdate"> | string
    message?: StringFilter<"ActivityUpdate"> | string
    details?: StringNullableFilter<"ActivityUpdate"> | string | null
    createdAt?: DateTimeFilter<"ActivityUpdate"> | Date | string
  }, "id">

  export type ActivityUpdateOrderByWithAggregationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    profileId?: SortOrder
    profileName?: SortOrder
    type?: SortOrder
    message?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityUpdateCountOrderByAggregateInput
    _max?: ActivityUpdateMaxOrderByAggregateInput
    _min?: ActivityUpdateMinOrderByAggregateInput
  }

  export type ActivityUpdateScalarWhereWithAggregatesInput = {
    AND?: ActivityUpdateScalarWhereWithAggregatesInput | ActivityUpdateScalarWhereWithAggregatesInput[]
    OR?: ActivityUpdateScalarWhereWithAggregatesInput[]
    NOT?: ActivityUpdateScalarWhereWithAggregatesInput | ActivityUpdateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityUpdate"> | string
    timestamp?: StringWithAggregatesFilter<"ActivityUpdate"> | string
    profileId?: StringWithAggregatesFilter<"ActivityUpdate"> | string
    profileName?: StringWithAggregatesFilter<"ActivityUpdate"> | string
    type?: StringWithAggregatesFilter<"ActivityUpdate"> | string
    message?: StringWithAggregatesFilter<"ActivityUpdate"> | string
    details?: StringNullableWithAggregatesFilter<"ActivityUpdate"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityUpdate"> | Date | string
  }

  export type MatchmakerAccountWhereInput = {
    AND?: MatchmakerAccountWhereInput | MatchmakerAccountWhereInput[]
    OR?: MatchmakerAccountWhereInput[]
    NOT?: MatchmakerAccountWhereInput | MatchmakerAccountWhereInput[]
    id?: StringFilter<"MatchmakerAccount"> | string
    email?: StringFilter<"MatchmakerAccount"> | string
    password?: StringFilter<"MatchmakerAccount"> | string
    name?: StringFilter<"MatchmakerAccount"> | string
    role?: StringFilter<"MatchmakerAccount"> | string
    createdAt?: DateTimeFilter<"MatchmakerAccount"> | Date | string
  }

  export type MatchmakerAccountOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchmakerAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: MatchmakerAccountWhereInput | MatchmakerAccountWhereInput[]
    OR?: MatchmakerAccountWhereInput[]
    NOT?: MatchmakerAccountWhereInput | MatchmakerAccountWhereInput[]
    password?: StringFilter<"MatchmakerAccount"> | string
    name?: StringFilter<"MatchmakerAccount"> | string
    role?: StringFilter<"MatchmakerAccount"> | string
    createdAt?: DateTimeFilter<"MatchmakerAccount"> | Date | string
  }, "id" | "email">

  export type MatchmakerAccountOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: MatchmakerAccountCountOrderByAggregateInput
    _max?: MatchmakerAccountMaxOrderByAggregateInput
    _min?: MatchmakerAccountMinOrderByAggregateInput
  }

  export type MatchmakerAccountScalarWhereWithAggregatesInput = {
    AND?: MatchmakerAccountScalarWhereWithAggregatesInput | MatchmakerAccountScalarWhereWithAggregatesInput[]
    OR?: MatchmakerAccountScalarWhereWithAggregatesInput[]
    NOT?: MatchmakerAccountScalarWhereWithAggregatesInput | MatchmakerAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchmakerAccount"> | string
    email?: StringWithAggregatesFilter<"MatchmakerAccount"> | string
    password?: StringWithAggregatesFilter<"MatchmakerAccount"> | string
    name?: StringWithAggregatesFilter<"MatchmakerAccount"> | string
    role?: StringWithAggregatesFilter<"MatchmakerAccount"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MatchmakerAccount"> | Date | string
  }

  export type CustomerProfileCreateInput = {
    id?: string
    firstName: string
    lastName: string
    gender: string
    dob: string
    age: number
    height: number
    languages: JsonNullValueInput | InputJsonValue
    religion: string
    caste: string
    maritalStatus: string
    email: string
    phone: string
    country: string
    city: string
    education: JsonNullValueInput | InputJsonValue
    career: JsonNullValueInput | InputJsonValue
    preferences: JsonNullValueInput | InputJsonValue
    familyInfo: JsonNullValueInput | InputJsonValue
    status: string
    assignedMatchmaker: string
    lastActivity: string
    savedMatches: JsonNullValueInput | InputJsonValue
    sentMatches: JsonNullValueInput | InputJsonValue
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: MatchNoteCreateNestedManyWithoutProfileInput
  }

  export type CustomerProfileUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    gender: string
    dob: string
    age: number
    height: number
    languages: JsonNullValueInput | InputJsonValue
    religion: string
    caste: string
    maritalStatus: string
    email: string
    phone: string
    country: string
    city: string
    education: JsonNullValueInput | InputJsonValue
    career: JsonNullValueInput | InputJsonValue
    preferences: JsonNullValueInput | InputJsonValue
    familyInfo: JsonNullValueInput | InputJsonValue
    status: string
    assignedMatchmaker: string
    lastActivity: string
    savedMatches: JsonNullValueInput | InputJsonValue
    sentMatches: JsonNullValueInput | InputJsonValue
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: MatchNoteUncheckedCreateNestedManyWithoutProfileInput
  }

  export type CustomerProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    languages?: JsonNullValueInput | InputJsonValue
    religion?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    maritalStatus?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    career?: JsonNullValueInput | InputJsonValue
    preferences?: JsonNullValueInput | InputJsonValue
    familyInfo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    assignedMatchmaker?: StringFieldUpdateOperationsInput | string
    lastActivity?: StringFieldUpdateOperationsInput | string
    savedMatches?: JsonNullValueInput | InputJsonValue
    sentMatches?: JsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: MatchNoteUpdateManyWithoutProfileNestedInput
  }

  export type CustomerProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    languages?: JsonNullValueInput | InputJsonValue
    religion?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    maritalStatus?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    career?: JsonNullValueInput | InputJsonValue
    preferences?: JsonNullValueInput | InputJsonValue
    familyInfo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    assignedMatchmaker?: StringFieldUpdateOperationsInput | string
    lastActivity?: StringFieldUpdateOperationsInput | string
    savedMatches?: JsonNullValueInput | InputJsonValue
    sentMatches?: JsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: MatchNoteUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type CustomerProfileCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    gender: string
    dob: string
    age: number
    height: number
    languages: JsonNullValueInput | InputJsonValue
    religion: string
    caste: string
    maritalStatus: string
    email: string
    phone: string
    country: string
    city: string
    education: JsonNullValueInput | InputJsonValue
    career: JsonNullValueInput | InputJsonValue
    preferences: JsonNullValueInput | InputJsonValue
    familyInfo: JsonNullValueInput | InputJsonValue
    status: string
    assignedMatchmaker: string
    lastActivity: string
    savedMatches: JsonNullValueInput | InputJsonValue
    sentMatches: JsonNullValueInput | InputJsonValue
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    languages?: JsonNullValueInput | InputJsonValue
    religion?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    maritalStatus?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    career?: JsonNullValueInput | InputJsonValue
    preferences?: JsonNullValueInput | InputJsonValue
    familyInfo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    assignedMatchmaker?: StringFieldUpdateOperationsInput | string
    lastActivity?: StringFieldUpdateOperationsInput | string
    savedMatches?: JsonNullValueInput | InputJsonValue
    sentMatches?: JsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    languages?: JsonNullValueInput | InputJsonValue
    religion?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    maritalStatus?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    career?: JsonNullValueInput | InputJsonValue
    preferences?: JsonNullValueInput | InputJsonValue
    familyInfo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    assignedMatchmaker?: StringFieldUpdateOperationsInput | string
    lastActivity?: StringFieldUpdateOperationsInput | string
    savedMatches?: JsonNullValueInput | InputJsonValue
    sentMatches?: JsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchNoteCreateInput = {
    id?: string
    date: string
    author: string
    content: string
    isAiGenerated?: boolean
    profile: CustomerProfileCreateNestedOneWithoutNotesInput
  }

  export type MatchNoteUncheckedCreateInput = {
    id?: string
    profileId: string
    date: string
    author: string
    content: string
    isAiGenerated?: boolean
  }

  export type MatchNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
    profile?: CustomerProfileUpdateOneRequiredWithoutNotesNestedInput
  }

  export type MatchNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MatchNoteCreateManyInput = {
    id?: string
    profileId: string
    date: string
    author: string
    content: string
    isAiGenerated?: boolean
  }

  export type MatchNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MatchNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUpdateCreateInput = {
    id?: string
    timestamp: string
    profileId: string
    profileName: string
    type: string
    message: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityUpdateUncheckedCreateInput = {
    id?: string
    timestamp: string
    profileId: string
    profileName: string
    type: string
    message: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityUpdateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUpdateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUpdateCreateManyInput = {
    id?: string
    timestamp: string
    profileId: string
    profileName: string
    type: string
    message: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityUpdateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUpdateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    profileName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchmakerAccountCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
  }

  export type MatchmakerAccountUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
  }

  export type MatchmakerAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchmakerAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchmakerAccountCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
  }

  export type MatchmakerAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchmakerAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MatchNoteListRelationFilter = {
    every?: MatchNoteWhereInput
    some?: MatchNoteWhereInput
    none?: MatchNoteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MatchNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerProfileCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    languages?: SortOrder
    religion?: SortOrder
    caste?: SortOrder
    maritalStatus?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    country?: SortOrder
    city?: SortOrder
    education?: SortOrder
    career?: SortOrder
    preferences?: SortOrder
    familyInfo?: SortOrder
    status?: SortOrder
    assignedMatchmaker?: SortOrder
    lastActivity?: SortOrder
    savedMatches?: SortOrder
    sentMatches?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerProfileAvgOrderByAggregateInput = {
    age?: SortOrder
    height?: SortOrder
  }

  export type CustomerProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    religion?: SortOrder
    caste?: SortOrder
    maritalStatus?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    country?: SortOrder
    city?: SortOrder
    status?: SortOrder
    assignedMatchmaker?: SortOrder
    lastActivity?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerProfileMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    gender?: SortOrder
    dob?: SortOrder
    age?: SortOrder
    height?: SortOrder
    religion?: SortOrder
    caste?: SortOrder
    maritalStatus?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    country?: SortOrder
    city?: SortOrder
    status?: SortOrder
    assignedMatchmaker?: SortOrder
    lastActivity?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerProfileSumOrderByAggregateInput = {
    age?: SortOrder
    height?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CustomerProfileScalarRelationFilter = {
    is?: CustomerProfileWhereInput
    isNot?: CustomerProfileWhereInput
  }

  export type MatchNoteCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    date?: SortOrder
    author?: SortOrder
    content?: SortOrder
    isAiGenerated?: SortOrder
  }

  export type MatchNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    date?: SortOrder
    author?: SortOrder
    content?: SortOrder
    isAiGenerated?: SortOrder
  }

  export type MatchNoteMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    date?: SortOrder
    author?: SortOrder
    content?: SortOrder
    isAiGenerated?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ActivityUpdateCountOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    profileId?: SortOrder
    profileName?: SortOrder
    type?: SortOrder
    message?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityUpdateMaxOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    profileId?: SortOrder
    profileName?: SortOrder
    type?: SortOrder
    message?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityUpdateMinOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    profileId?: SortOrder
    profileName?: SortOrder
    type?: SortOrder
    message?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchmakerAccountCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchmakerAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchmakerAccountMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchNoteCreateNestedManyWithoutProfileInput = {
    create?: XOR<MatchNoteCreateWithoutProfileInput, MatchNoteUncheckedCreateWithoutProfileInput> | MatchNoteCreateWithoutProfileInput[] | MatchNoteUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: MatchNoteCreateOrConnectWithoutProfileInput | MatchNoteCreateOrConnectWithoutProfileInput[]
    createMany?: MatchNoteCreateManyProfileInputEnvelope
    connect?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
  }

  export type MatchNoteUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<MatchNoteCreateWithoutProfileInput, MatchNoteUncheckedCreateWithoutProfileInput> | MatchNoteCreateWithoutProfileInput[] | MatchNoteUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: MatchNoteCreateOrConnectWithoutProfileInput | MatchNoteCreateOrConnectWithoutProfileInput[]
    createMany?: MatchNoteCreateManyProfileInputEnvelope
    connect?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MatchNoteUpdateManyWithoutProfileNestedInput = {
    create?: XOR<MatchNoteCreateWithoutProfileInput, MatchNoteUncheckedCreateWithoutProfileInput> | MatchNoteCreateWithoutProfileInput[] | MatchNoteUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: MatchNoteCreateOrConnectWithoutProfileInput | MatchNoteCreateOrConnectWithoutProfileInput[]
    upsert?: MatchNoteUpsertWithWhereUniqueWithoutProfileInput | MatchNoteUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: MatchNoteCreateManyProfileInputEnvelope
    set?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
    disconnect?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
    delete?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
    connect?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
    update?: MatchNoteUpdateWithWhereUniqueWithoutProfileInput | MatchNoteUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: MatchNoteUpdateManyWithWhereWithoutProfileInput | MatchNoteUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: MatchNoteScalarWhereInput | MatchNoteScalarWhereInput[]
  }

  export type MatchNoteUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<MatchNoteCreateWithoutProfileInput, MatchNoteUncheckedCreateWithoutProfileInput> | MatchNoteCreateWithoutProfileInput[] | MatchNoteUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: MatchNoteCreateOrConnectWithoutProfileInput | MatchNoteCreateOrConnectWithoutProfileInput[]
    upsert?: MatchNoteUpsertWithWhereUniqueWithoutProfileInput | MatchNoteUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: MatchNoteCreateManyProfileInputEnvelope
    set?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
    disconnect?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
    delete?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
    connect?: MatchNoteWhereUniqueInput | MatchNoteWhereUniqueInput[]
    update?: MatchNoteUpdateWithWhereUniqueWithoutProfileInput | MatchNoteUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: MatchNoteUpdateManyWithWhereWithoutProfileInput | MatchNoteUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: MatchNoteScalarWhereInput | MatchNoteScalarWhereInput[]
  }

  export type CustomerProfileCreateNestedOneWithoutNotesInput = {
    create?: XOR<CustomerProfileCreateWithoutNotesInput, CustomerProfileUncheckedCreateWithoutNotesInput>
    connectOrCreate?: CustomerProfileCreateOrConnectWithoutNotesInput
    connect?: CustomerProfileWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CustomerProfileUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<CustomerProfileCreateWithoutNotesInput, CustomerProfileUncheckedCreateWithoutNotesInput>
    connectOrCreate?: CustomerProfileCreateOrConnectWithoutNotesInput
    upsert?: CustomerProfileUpsertWithoutNotesInput
    connect?: CustomerProfileWhereUniqueInput
    update?: XOR<XOR<CustomerProfileUpdateToOneWithWhereWithoutNotesInput, CustomerProfileUpdateWithoutNotesInput>, CustomerProfileUncheckedUpdateWithoutNotesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MatchNoteCreateWithoutProfileInput = {
    id?: string
    date: string
    author: string
    content: string
    isAiGenerated?: boolean
  }

  export type MatchNoteUncheckedCreateWithoutProfileInput = {
    id?: string
    date: string
    author: string
    content: string
    isAiGenerated?: boolean
  }

  export type MatchNoteCreateOrConnectWithoutProfileInput = {
    where: MatchNoteWhereUniqueInput
    create: XOR<MatchNoteCreateWithoutProfileInput, MatchNoteUncheckedCreateWithoutProfileInput>
  }

  export type MatchNoteCreateManyProfileInputEnvelope = {
    data: MatchNoteCreateManyProfileInput | MatchNoteCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type MatchNoteUpsertWithWhereUniqueWithoutProfileInput = {
    where: MatchNoteWhereUniqueInput
    update: XOR<MatchNoteUpdateWithoutProfileInput, MatchNoteUncheckedUpdateWithoutProfileInput>
    create: XOR<MatchNoteCreateWithoutProfileInput, MatchNoteUncheckedCreateWithoutProfileInput>
  }

  export type MatchNoteUpdateWithWhereUniqueWithoutProfileInput = {
    where: MatchNoteWhereUniqueInput
    data: XOR<MatchNoteUpdateWithoutProfileInput, MatchNoteUncheckedUpdateWithoutProfileInput>
  }

  export type MatchNoteUpdateManyWithWhereWithoutProfileInput = {
    where: MatchNoteScalarWhereInput
    data: XOR<MatchNoteUpdateManyMutationInput, MatchNoteUncheckedUpdateManyWithoutProfileInput>
  }

  export type MatchNoteScalarWhereInput = {
    AND?: MatchNoteScalarWhereInput | MatchNoteScalarWhereInput[]
    OR?: MatchNoteScalarWhereInput[]
    NOT?: MatchNoteScalarWhereInput | MatchNoteScalarWhereInput[]
    id?: StringFilter<"MatchNote"> | string
    profileId?: StringFilter<"MatchNote"> | string
    date?: StringFilter<"MatchNote"> | string
    author?: StringFilter<"MatchNote"> | string
    content?: StringFilter<"MatchNote"> | string
    isAiGenerated?: BoolFilter<"MatchNote"> | boolean
  }

  export type CustomerProfileCreateWithoutNotesInput = {
    id?: string
    firstName: string
    lastName: string
    gender: string
    dob: string
    age: number
    height: number
    languages: JsonNullValueInput | InputJsonValue
    religion: string
    caste: string
    maritalStatus: string
    email: string
    phone: string
    country: string
    city: string
    education: JsonNullValueInput | InputJsonValue
    career: JsonNullValueInput | InputJsonValue
    preferences: JsonNullValueInput | InputJsonValue
    familyInfo: JsonNullValueInput | InputJsonValue
    status: string
    assignedMatchmaker: string
    lastActivity: string
    savedMatches: JsonNullValueInput | InputJsonValue
    sentMatches: JsonNullValueInput | InputJsonValue
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerProfileUncheckedCreateWithoutNotesInput = {
    id?: string
    firstName: string
    lastName: string
    gender: string
    dob: string
    age: number
    height: number
    languages: JsonNullValueInput | InputJsonValue
    religion: string
    caste: string
    maritalStatus: string
    email: string
    phone: string
    country: string
    city: string
    education: JsonNullValueInput | InputJsonValue
    career: JsonNullValueInput | InputJsonValue
    preferences: JsonNullValueInput | InputJsonValue
    familyInfo: JsonNullValueInput | InputJsonValue
    status: string
    assignedMatchmaker: string
    lastActivity: string
    savedMatches: JsonNullValueInput | InputJsonValue
    sentMatches: JsonNullValueInput | InputJsonValue
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerProfileCreateOrConnectWithoutNotesInput = {
    where: CustomerProfileWhereUniqueInput
    create: XOR<CustomerProfileCreateWithoutNotesInput, CustomerProfileUncheckedCreateWithoutNotesInput>
  }

  export type CustomerProfileUpsertWithoutNotesInput = {
    update: XOR<CustomerProfileUpdateWithoutNotesInput, CustomerProfileUncheckedUpdateWithoutNotesInput>
    create: XOR<CustomerProfileCreateWithoutNotesInput, CustomerProfileUncheckedCreateWithoutNotesInput>
    where?: CustomerProfileWhereInput
  }

  export type CustomerProfileUpdateToOneWithWhereWithoutNotesInput = {
    where?: CustomerProfileWhereInput
    data: XOR<CustomerProfileUpdateWithoutNotesInput, CustomerProfileUncheckedUpdateWithoutNotesInput>
  }

  export type CustomerProfileUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    languages?: JsonNullValueInput | InputJsonValue
    religion?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    maritalStatus?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    career?: JsonNullValueInput | InputJsonValue
    preferences?: JsonNullValueInput | InputJsonValue
    familyInfo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    assignedMatchmaker?: StringFieldUpdateOperationsInput | string
    lastActivity?: StringFieldUpdateOperationsInput | string
    savedMatches?: JsonNullValueInput | InputJsonValue
    sentMatches?: JsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerProfileUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    dob?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    languages?: JsonNullValueInput | InputJsonValue
    religion?: StringFieldUpdateOperationsInput | string
    caste?: StringFieldUpdateOperationsInput | string
    maritalStatus?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    education?: JsonNullValueInput | InputJsonValue
    career?: JsonNullValueInput | InputJsonValue
    preferences?: JsonNullValueInput | InputJsonValue
    familyInfo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    assignedMatchmaker?: StringFieldUpdateOperationsInput | string
    lastActivity?: StringFieldUpdateOperationsInput | string
    savedMatches?: JsonNullValueInput | InputJsonValue
    sentMatches?: JsonNullValueInput | InputJsonValue
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchNoteCreateManyProfileInput = {
    id?: string
    date: string
    author: string
    content: string
    isAiGenerated?: boolean
  }

  export type MatchNoteUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MatchNoteUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MatchNoteUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}