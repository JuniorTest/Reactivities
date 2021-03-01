using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Actitivites
{
    public class Delete
    {
        public class DeleteCommand : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteCommand request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);   

                if (activity == null)
                    throw new Exception("Could not find activity");            

                _context.Remove(activity);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}