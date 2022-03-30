export class GenericHelper {
  public static uncheckedCast<SrcType, DstType>(ob: SrcType): DstType {
    return ob as unknown as DstType;
  }
}
