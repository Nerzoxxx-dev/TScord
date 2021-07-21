export interface GatewayPayload {
    /** @var number */
    op: number;

    /** @var any */
    d: any;

    /** @var number|null */
    s: number | null;

    /** @var string|null */
    t: string | null;
}