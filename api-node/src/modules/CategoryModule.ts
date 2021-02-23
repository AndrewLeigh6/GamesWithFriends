import { Category } from "./../db/models/Category";
export class CategoryModule {
  rowId: number | null = null;
  name: string | null = null;

  /* Potential flaw? We check if the category exists, but we don't
  check if a category / game relationship exists. Not sure if this
  could cause any problems, will look into later */
  private recordExists = async (
    name: string
  ): Promise<Category | undefined> => {
    const category: Category | undefined = await Category.query()
      .where("name", "=", name)
      .first();

    return category;
  };

  private setExistingCategoryDetails = (category: Category): void => {
    if (typeof category.id === "number" && typeof category.name === "string") {
      this.rowId = category.id;
      this.name = category.name;
    }
  };

  private save = async (name: string): Promise<number | null> => {
    const categoryRow = await Category.query()
      .insert({ name: name })
      .returning("id");

    if (categoryRow.id) {
      return categoryRow.id;
    } else {
      return null;
    }
  };

  public init = async (name: string): Promise<void> => {
    this.name = name;

    const existingCategory = await this.recordExists(name);

    if (existingCategory) {
      this.setExistingCategoryDetails(existingCategory);
    } else {
      this.rowId = await this.save(name);
    }
  };
}
