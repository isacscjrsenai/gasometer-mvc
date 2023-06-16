using Microsoft.EntityFrameworkCore;
using Gasometer.EntityConfigs;
using Gasometer.Models;//inserir não esquecer
namespace Gasometer.Contexts;

//DbContext --> Banco
//DbSet  --> Tabela

//Banco ":" herança
public class AppDbContext:DbContext{
   //Tabela - Criar a tabela
   //DbSet<Competencia>
   public DbSet<Veiculo> Veiculos => Set<Veiculo>();//tabela

    //override - sobrescrita -polimorfismo
    //mesmo método sobrescrito
    //configurar conexão
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       optionsBuilder.UseSqlServer("Server=LAB-F08-06;Database=Gasometer;User Id=sa;Password=senai@123;TrustServerCertificate=True;");
    }

    //aplicar as configurações da tabela
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new VeiculoEntityConfig());
    }


}
