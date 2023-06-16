using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Gasometer.Models;
namespace Gasometer.EntityConfigs;

//Interface é o mais alto nível de abstração
//Na orientação a objetos ela é a ponta do Icerberg
//Funciona com um contrato com as classes
//Obriga geralmente a implementação
//Vamos implementar um método da interface?
public class VeiculoEntityConfig : IEntityTypeConfiguration<Veiculo>
{

    //FLUENT API
    public void Configure(EntityTypeBuilder<Veiculo> builder)
    {

         builder.ToTable("Veiculo");
        /*
           Chave primária: identificador
           único - universal e imutável 
        */    
        
        builder.HasKey(c=>c.Id);

        builder.Property(c=>c.Id)
               .HasColumnName("Id");
        
        /*Coluna Tipo*/
        builder.Property(c=>c.Tipo)
               .HasColumnName("Tipo")
               .HasColumnType("varchar(10)")
               .IsRequired();

       /*Coluna Marca*/
        builder.Property(c=>c.Marca)
               .HasColumnName("Marca")
               .HasColumnType("varchar(30)")
               .IsRequired();

        /*Coluna Modelo*/
        builder.Property(c=>c.Modelo)
               .HasColumnName("Modelo")
               .HasColumnType("varchar(100)")
               .IsRequired();
       
       /*Coluna Combustivel*/
        builder.Property(c=>c.Combustivel)
               .HasColumnName("Combustivel")
               .HasColumnType("varchar(10)")
               .IsRequired();
       
       /*Coluna Ano*/
        builder.Property(c=>c.Ano)
               .HasColumnName("Ano")
               .HasColumnType("int")
               .IsRequired();
       
       /*Coluna GastoPorKm*/
        builder.Property(c=>c.GastoPorKm)
               .HasColumnName("GastoPorKm")
               .HasColumnType("decimal")
               .IsRequired();
       
       /*Coluna */
        builder.Property(c=>c.Preco)
               .HasColumnName("Preco")
               .HasColumnType("decimal")
               .IsRequired();
        
    }
}