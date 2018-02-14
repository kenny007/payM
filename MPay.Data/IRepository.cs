using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MPay.Data
{
    public interface IRepository<T> : IDisposable where T : class
    {
        void Edit(T entity);
        void Edit2(T entity, object updated);
        T Find(string cid);
        T Find(int cid);
        IQueryable<T> GetAll();
        //IEnumerable<T> EnumerableGetAll();
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
        void Insert(T entity);
        T Insert(T entity, string emig);
        void Delete(T entity);
        void Delete(int id);
        void Save();
    }
}