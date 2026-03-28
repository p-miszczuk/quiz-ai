interface PageHeaderProps {
  readonly title: string;
  readonly description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <section className="page-header w-full py-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="text-gray-500">{description}</p>}
    </section>
  );
};
