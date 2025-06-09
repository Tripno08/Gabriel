import { Link } from 'react-router-dom'
import { Star, MapPin, Heart } from 'lucide-react'

interface ServiceCardProps {
  id: string
  name: string
  description: string
  providerName: string
  providerId: string
  rating?: number
  reviewCount?: number
  imageUrl?: string
  category?: string
  price?: number
  location?: string
  isFavorite?: boolean
  onFavoriteToggle?: () => void
}

export default function ServiceCard({
  id,
  name,
  description,
  providerName,
  providerId,
  rating = 0,
  reviewCount = 0,
  imageUrl,
  category,
  price,
  location,
  isFavorite = false,
  onFavoriteToggle
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Image */}
      <div className="relative h-40 bg-gradient-to-br from-primary-100 to-primary-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary-600 font-medium">{name.charAt(0)}</span>
          </div>
        )}
        
        {/* Favorite button */}
        {onFavoriteToggle && (
          <button
            onClick={onFavoriteToggle}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            />
          </button>
        )}

        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Service name */}
        <Link to={`/services/${id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Provider info */}
        <Link 
          to={`/providers/${providerId}`}
          className="flex items-center mb-3 hover:text-primary-600 transition-colors"
        >
          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-primary-600">
              {providerName.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-700 font-medium">
            {providerName}
          </span>
        </Link>

        {/* Rating and reviews */}
        {rating > 0 && (
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900 ml-1">
                {rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({reviewCount} {reviewCount === 1 ? 'avaliação' : 'avaliações'})
            </span>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center mb-3">
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{location}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {price ? (
            <div>
              <span className="text-lg font-bold text-primary-600">
                R$ {price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 ml-1">a partir de</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Preço sob consulta</span>
          )}
          
          <Link
            to={`/services/${id}`}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  )
} 