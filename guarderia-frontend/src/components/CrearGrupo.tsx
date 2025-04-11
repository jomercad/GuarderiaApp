// components/CrearGrupo.tsx
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function CrearGrupo() {
  const [estudiantesDisponibles, setEstudiantes] = useState<Estudiante[]>([]);
  const [grupo, setGrupo] = useState<Estudiante[]>([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(estudiantesDisponibles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEstudiantes(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="estudiantes">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {estudiantesDisponibles.map((est, index) => (
              <Draggable key={est.id} draggableId={est.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {est.nombre}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
