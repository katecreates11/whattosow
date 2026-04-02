import type { CropRecipe } from "@/data/varieties";

export default function RecipeSection({ recipes }: { recipes: CropRecipe[] }) {
  if (recipes.length === 0) return null;

  return (
    <div className="my-10">
      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-earth-lighter block mb-4">
        What you&apos;ll be eating
      </span>
      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div key={recipe.name} className="border-t border-earth/8 pt-4">
            <h3 className="font-serif text-lg text-earth mb-2">{recipe.name}</h3>
            <p className="text-[15px] text-earth-light leading-relaxed">{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
