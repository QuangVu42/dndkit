export function formatAddress(address: string, first = 6, last = 4): string {
    if (first < 0 || last <= 0) {
        throw new Error('Invalid parameter(s)');
    }
    return address.slice(0, first) + '...' + address.slice(-last);
}