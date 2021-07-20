export abstract class Utils {
    static hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
}